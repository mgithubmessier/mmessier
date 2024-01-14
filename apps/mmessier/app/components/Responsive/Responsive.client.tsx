'use client';

import { useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { DebouncedFunc, throttle } from 'lodash';

import { basicStyles } from './styles.client';

export type OnResize = (rect: DOMRect | undefined, status?: boolean) => void;

export type ResponsiveProps = {
  onResize: OnResize;
  includeStatus?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  throttleMS?: number;
  style?: React.CSSProperties;
};

export const Responsive = ({
  onResize,
  includeStatus,
  disabled,
  children,
  throttleMS = 250,
  style,
  ...rest
}: ResponsiveProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const onResizeThrottled = useCallback<DebouncedFunc<OnResize>>(
    throttle((rect: DOMRect | undefined, status: boolean) => {
      if (!rect) {
        return;
      }
      if (status !== undefined) {
        onResize(rect, status);
      } else {
        onResize(rect);
      }
    }, throttleMS),
    [onResize]
  );

  const handleResize = (rect: DOMRect | undefined) => {
    if (!disabled && rect) {
      if (includeStatus) {
        onResizeThrottled(rect, false);
      } else {
        onResizeThrottled(rect);
      }
    }
  };

  useLayoutEffect(() => {
    const rect = containerRef.current?.getBoundingClientRect?.();
    handleResize(rect);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    const listener = () => {
      const rect = containerRef.current?.getBoundingClientRect?.();
      if (!disabled) {
        if (includeStatus) {
          if (timeout) {
            clearTimeout(timeout);
          }
          onResizeThrottled(rect, true);

          timeout = setTimeout(() => {
            onResizeThrottled(rect, false);
          }, 250);
        } else {
          onResizeThrottled(rect);
        }
      }
    };
    window.addEventListener('resize', listener);

    const rect = containerRef.current?.getBoundingClientRect?.();
    handleResize(rect);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [disabled, onResize, throttleMS]);

  return (
    <div
      style={{ ...basicStyles.static?.container, ...style }}
      ref={containerRef}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Responsive;
