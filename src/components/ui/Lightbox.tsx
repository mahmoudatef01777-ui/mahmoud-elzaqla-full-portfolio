import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Minus, Plus, RotateCcw, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';

export interface LightboxImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

/**
 * Full-screen view of a proof screenshot, with zoom.
 *
 * The captures are wide dashboard tables: on a phone, and often on a laptop,
 * they are shrunk to fit and the figures stop being legible. So this view can
 * zoom — wheel, pinch, the +/− controls, double-click, or the +/-/0 keys — and
 * pan by dragging once it is zoomed in.
 *
 * The zoom ceiling is the image's own natural pixel size, so the numbers stay
 * sharp all the way up: a blurred, upscaled dashboard looks doctored, and the
 * numbers are the whole point. Small captures get a floor of 3x anyway, since
 * a 257px-wide table is unreadable otherwise.
 */
const STEP = 0.5;

export default function Lightbox({
  image,
  onClose,
  closeLabel,
}: {
  image: LightboxImage | null;
  onClose: () => void;
  closeLabel: string;
}) {
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [maxScale, setMaxScale] = useState(3);
  const [dragging, setDragging] = useState(false);

  /** Live pointers, so one finger pans and two fingers pinch. */
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const panStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const moved = useRef(false);

  /** Keep the image inside the frame: pan no further than the overflow. */
  const clamp = useCallback((next: { x: number; y: number }, s: number) => {
    const el = imgRef.current;
    const frame = frameRef.current;
    if (!el || !frame) return next;
    const maxX = Math.max(0, (el.clientWidth * s - frame.clientWidth) / 2);
    const maxY = Math.max(0, (el.clientHeight * s - frame.clientHeight) / 2);
    return {
      x: Math.min(maxX, Math.max(-maxX, next.x)),
      y: Math.min(maxY, Math.max(-maxY, next.y)),
    };
  }, []);

  const zoomTo = useCallback(
    (next: number) => {
      const s = Math.min(maxScale, Math.max(1, next));
      setScale(s);
      setPos((p) => (s === 1 ? { x: 0, y: 0 } : clamp(p, s)));
    },
    [clamp, maxScale],
  );

  /** Reset whenever a different image opens. */
  useEffect(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
    pointers.current.clear();
    pinchStart.current = null;
  }, [image?.src]);

  const onImageLoad = useCallback(() => {
    const el = imgRef.current;
    if (!el || !image) return;
    // How far it can go before it stops being 1:1 with the source pixels.
    const fitted = el.clientWidth || 1;
    setMaxScale(Math.min(6, Math.max(3, image.width / fitted)));
  }, [image]);

  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === '+' || e.key === '=') zoomTo(scale + STEP);
      else if (e.key === '-' || e.key === '_') zoomTo(scale - STEP);
      else if (e.key === '0') zoomTo(1);
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [image, onClose, scale, zoomTo]);

  if (!image) return createPortal(<AnimatePresence />, document.body);

  const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    Math.hypot(a.x - b.x, a.y - b.y);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved.current = false;
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = { dist: dist(a, b), scale };
    } else if (scale > 1) {
      panStart.current = { x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y };
      setDragging(true);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()];
      const ratio = dist(a, b) / (pinchStart.current.dist || 1);
      moved.current = true;
      zoomTo(pinchStart.current.scale * ratio);
      return;
    }

    if (panStart.current) {
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved.current = true;
      setPos(clamp({ x: panStart.current.ox + dx, y: panStart.current.oy + dy }, scale));
    }
  };

  const endPointer = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) {
      panStart.current = null;
      setDragging(false);
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    zoomTo(scale + (e.deltaY < 0 ? STEP : -STEP));
  };

  const control =
    'grid h-10 w-10 place-items-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream hover:text-ink disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-cream';

  return createPortal(
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={image.alt}
        onClick={() => {
          // A drag or a pinch should never dismiss the view.
          if (!moved.current) onClose();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0.01 : 0.2 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/90 p-5 md:p-10"
      >
        {/* Controls. Stop propagation so the backdrop handler cannot fire. */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute end-4 top-4 z-10 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => zoomTo(scale - STEP)}
            disabled={scale <= 1}
            aria-label="Zoom out"
            className={control}
          >
            <Minus size={16} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => zoomTo(scale + STEP)}
            disabled={scale >= maxScale}
            aria-label="Zoom in"
            className={control}
          >
            <Plus size={16} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => zoomTo(1)}
            disabled={scale === 1}
            aria-label="Reset zoom"
            className={control}
          >
            <RotateCcw size={15} aria-hidden />
          </button>
          <button type="button" onClick={onClose} aria-label={closeLabel} className={control}>
            <X size={18} aria-hidden />
          </button>
        </div>

        <div
          ref={frameRef}
          onClick={(e) => e.stopPropagation()}
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onDoubleClick={() => zoomTo(scale > 1 ? 1 : Math.min(maxScale, 2))}
          className={cn(
            'flex max-h-[78vh] w-full max-w-full items-center justify-center overflow-hidden',
            scale > 1 ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in',
          )}
          // The element handles its own gestures; the browser must not also
          // scroll the page underneath while pinching.
          style={{ touchAction: 'none' }}
        >
          <img
            ref={imgRef}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            onLoad={onImageLoad}
            draggable={false}
            className="max-h-[78vh] select-none rounded-card bg-cream object-contain"
            style={{
              maxWidth: `min(100%, ${image.width}px)`,
              transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale})`,
              transition: dragging || reduce ? 'none' : 'transform 0.18s ease-out',
            }}
          />
        </div>

        {image.caption && (
          <p
            onClick={(e) => e.stopPropagation()}
            className="max-w-[46rem] text-center text-xs text-cream/80 md:text-sm"
          >
            {image.caption}
          </p>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
