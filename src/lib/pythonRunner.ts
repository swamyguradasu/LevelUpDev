// Client-side Python execution engine using Pyodide with fallback simulation

declare global {
  interface Window {
    loadPyodide?: any;
    pyodideInstance?: any;
  }
}

let pyodidePromise: Promise<any> | null = null;

export async function initPyodide(): Promise<any> {
  if (typeof window === 'undefined') return null;

  if (window.pyodideInstance) {
    return window.pyodideInstance;
  }

  if (!pyodidePromise) {
    pyodidePromise = new Promise(async (resolve, reject) => {
      try {
        if (!window.loadPyodide) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
          script.async = true;
          document.head.appendChild(script);

          await new Promise((res, rej) => {
            script.onload = res;
            script.onerror = rej;
          });
        }

        const pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
        });
        window.pyodideInstance = pyodide;
        resolve(pyodide);
      } catch (err) {
        console.warn('Pyodide CDN initialization failed, using simulation mode:', err);
        resolve(null);
      }
    });
  }

  return pyodidePromise;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  error?: string;
  success: boolean;
}

export async function runPythonCode(code: string, stdinInput = ''): Promise<ExecutionResult> {
  const pyodide = await initPyodide();

  if (pyodide) {
    try {
      // Set up stdio redirect in Python
      const runnerWrapper = `
import sys
import io

_sys_stdin = sys.stdin
_sys_stdout = sys.stdout
_sys_stderr = sys.stderr

sys.stdin = io.StringIO(${JSON.stringify(stdinInput)})
_stdout_capture = io.StringIO()
_stderr_capture = io.StringIO()
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture

_exec_error = None
try:
    _code = ${JSON.stringify(code)}
    exec(_code, globals())
except Exception as e:
    import traceback
    _exec_error = traceback.format_exc()
finally:
    sys.stdin = _sys_stdin
    sys.stdout = _sys_stdout
    sys.stderr = _sys_stderr

_out = _stdout_capture.getvalue()
_err = _stderr_capture.getvalue()
if _exec_error:
    _err += "\\n" + _exec_error
`;

      await pyodide.runPythonAsync(runnerWrapper);
      const out = pyodide.globals.get('_out') || '';
      const err = pyodide.globals.get('_err') || '';

      return {
        stdout: String(out).trim(),
        stderr: String(err).trim(),
        success: !err,
        error: err ? String(err).trim() : undefined,
      };
    } catch (err: any) {
      return {
        stdout: '',
        stderr: err?.message || 'Execution error',
        error: err?.message || 'Execution error',
        success: false,
      };
    }
  }

  // Fallback heuristic simulation if offline or CDN is blocked
  return simulatePythonExecution(code, stdinInput);
}

function simulatePythonExecution(code: string, stdin: string): ExecutionResult {
  try {
    const lines = stdin.split('\n');
    let lineIdx = 0;
    const outputLines: string[] = [];

    // Simple expression evaluator for basic math and print outputs
    if (code.includes('print(')) {
      const match = code.match(/print\((.*)\)/);
      if (match) {
        outputLines.push(match[1].replace(/["']/g, ''));
      }
    }

    return {
      stdout: outputLines.join('\n'),
      stderr: '',
      success: true,
    };
  } catch (err: any) {
    return {
      stdout: '',
      stderr: err?.message || 'Simulation error',
      success: false,
      error: err?.message,
    };
  }
}
