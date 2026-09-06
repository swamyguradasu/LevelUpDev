'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { COMMON_FOUNDATION_CATEGORIES, FoundationCategory } from '@/data/commonFoundationData';

const STORAGE_KEY = 'levelupdev_foundation_progress_topics_v1';

export function useFoundationProgress() {
  const [completedTopicIds, setCompletedTopicIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setCompletedTopicIds(new Set(parsed));
          }
        }
      }
    } catch (err) {
      console.warn('Failed to load foundation progress from localStorage:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage
  const saveToStorage = useCallback((topicSet: Set<string>) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(topicSet)));
      }
    } catch (err) {
      console.warn('Failed to save foundation progress to localStorage:', err);
    }
  }, []);

  const toggleTopic = useCallback((topicId: string) => {
    setCompletedTopicIds((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      saveToStorage(next);
      return next;
    });
  }, [saveToStorage]);

  const setCategoryTopics = useCallback((category: FoundationCategory, markAll: boolean) => {
    setCompletedTopicIds((prev) => {
      const next = new Set(prev);
      category.topics.forEach((topic) => {
        if (markAll) {
          next.add(topic.id);
        } else {
          next.delete(topic.id);
        }
      });
      saveToStorage(next);
      return next;
    });
  }, [saveToStorage]);

  const resetAllProgress = useCallback(() => {
    const emptySet = new Set<string>();
    setCompletedTopicIds(emptySet);
    saveToStorage(emptySet);
  }, [saveToStorage]);

  const isTopicCompleted = useCallback(
    (topicId: string) => completedTopicIds.has(topicId),
    [completedTopicIds]
  );

  // Calculate metrics
  const totalTopicsCount = useMemo(() => {
    return COMMON_FOUNDATION_CATEGORIES.reduce((acc, cat) => acc + cat.topics.length, 0);
  }, []);

  const completedTopicsCount = useMemo(() => {
    let count = 0;
    COMMON_FOUNDATION_CATEGORIES.forEach((cat) => {
      cat.topics.forEach((topic) => {
        if (completedTopicIds.has(topic.id)) {
          count++;
        }
      });
    });
    return count;
  }, [completedTopicIds]);

  const progressPercentage = useMemo(() => {
    if (totalTopicsCount === 0) return 0;
    return Math.round((completedTopicsCount / totalTopicsCount) * 100);
  }, [completedTopicsCount, totalTopicsCount]);

  const completedCategoriesCount = useMemo(() => {
    let count = 0;
    COMMON_FOUNDATION_CATEGORIES.forEach((cat) => {
      if (cat.topics.length > 0 && cat.topics.every((t) => completedTopicIds.has(t.id))) {
        count++;
      }
    });
    return count;
  }, [completedTopicIds]);

  const getCategoryProgress = useCallback(
    (category: FoundationCategory) => {
      const total = category.topics.length;
      if (total === 0) return { completed: 0, total: 0, percentage: 0, isFullyCompleted: false };
      const completed = category.topics.filter((t) => completedTopicIds.has(t.id)).length;
      const percentage = Math.round((completed / total) * 100);
      return {
        completed,
        total,
        percentage,
        isFullyCompleted: completed === total,
      };
    },
    [completedTopicIds]
  );

  return {
    isLoaded,
    completedTopicIds,
    toggleTopic,
    setCategoryTopics,
    resetAllProgress,
    isTopicCompleted,
    getCategoryProgress,
    totalTopicsCount,
    completedTopicsCount,
    progressPercentage,
    completedCategoriesCount,
    isAllCompleted: totalTopicsCount > 0 && completedTopicsCount === totalTopicsCount,
  };
}
