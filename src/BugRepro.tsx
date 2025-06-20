"use client";
import { startTransition, use, useMemo } from "react";
import { useEffect, useState } from "react";
import { Suspense, Component } from "react";

export default function Entry() {
  return (
    // adding this suspense boundary removes too many hooks error
    // <Suspense>
    <Page />
    // </Suspense>
  );
}

function Page() {
  const [promise, setPromise] = useState<Promise<any> | null>(null);
  promise ? use(promise) : promise;
  useMemo(() => {}, []); // to trigger too many hooks error
  return (
    <>
      <Updater setPromise={setPromise} />
      <Suspense fallback={<div>...</div>}>
        <ErrorBoundary>
          <Bomb />
        </ErrorBoundary>
      </Suspense>
      ;
    </>
  );
}

const Updater = ({
  setPromise,
}: {
  setPromise: (promise: Promise<any>) => void;
}) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    // deleting this set state removes too many hooks error
    setState(true);
    // deleting this startTransition removes too many hooks error
    startTransition(() => {
      setPromise(Promise.resolve());
    });
  }, [state]);

  return null;
};

const Bomb = () => {
  throw new Error("boom");
};

export class ErrorBoundary extends Component<
  {
    children: React.ReactNode;
    fallback?: React.ReactNode;
  },
  {
    hasError: boolean;
    error: Error | null;
  }
> {
  constructor(props: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
  }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): {
    hasError: boolean;
    error: Error | null;
  } {
    return { hasError: true, error: error };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div>
            Error: {this.state.error?.message || "Something went wrong."}
          </div>
        )
      );
    }

    return this.props.children;
  }
}
