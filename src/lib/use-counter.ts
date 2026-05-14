"use client";
import { useEffect, useState } from "react";
import { COUNTER_SEED, TOTAL_SPOTS } from "./constants";

interface CounterState {
  spotsTaken: number;
  totalSpots: number;
  loading: boolean;
}

export function useCounter(): CounterState {
  const [state, setState] = useState<CounterState>({
    spotsTaken: COUNTER_SEED,
    totalSpots: TOTAL_SPOTS,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/counter")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setState({
          spotsTaken: data.spotsTaken ?? COUNTER_SEED,
          totalSpots: data.totalSpots ?? TOTAL_SPOTS,
          loading: false,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setState((s) => ({ ...s, loading: false }));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
