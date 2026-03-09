import { type RefObject, useEffect, useRef } from 'react';

/**
 * Enables drag-to-resize behavior for a panel element.
 *
 * Attaches `pointerdown` / `pointermove` / `pointerup` listeners to the document
 * so that dragging the resize handle updates the width of `targetRef` to match
 * the pointer's X position. The handle element is highlighted while dragging.
 *
 * @param targetRef - Ref to the element whose width will be updated on drag
 * @returns `resizeHandlerElement` – a JSX element to render as the drag handle
 */
export const useResizePanel = (
  targetRef: RefObject<HTMLElement | null>,
) => {
  const resizeRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  useEffect(() => {
    const pointermove = (e: MouseEvent) => {
      if (targetRef.current) {
        targetRef.current.style.width = `${e.clientX}px`;
      }
    };
    const pointerdown = (e: MouseEvent) => {
      if (e.target !== resizeRef.current) return;
      if (resizeRef.current) {
        resizeRef.current.classList.add('!bg-[#4493f8]');
      }
      document.addEventListener('pointermove', pointermove);
    };
    const pointerup = () => {
      if (resizeRef.current) {
        resizeRef.current.classList.remove('!bg-[#4493f8]');
      }
      document.removeEventListener('pointermove', pointermove);
    };
    document.addEventListener('pointerdown', pointerdown);
    document.addEventListener('pointerup', pointerup);

    return () => {
      document.removeEventListener('pointermove', pointermove);
      document.removeEventListener('pointerdown', pointerdown);
      document.removeEventListener('pointerup', pointerup);
    };
  }, []);

  const resizeHandlerElement = (
    <div className='relative'>
      <div
        className='absolute inset-0 w-[1px] cursor-col-resize hover:inset-[0_0_0_-0.125rem] hover:w-1 hover:bg-base-content/30'
        ref={resizeRef}
      />
    </div>
  );

  return { resizeHandlerElement };
};
