import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  className = '',
  trigger = true 
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    if (!trigger) return;

    const animation = anime({
      targets: countRef.current,
      value: end,
      duration,
      easing: 'easeOutExpo',
      update: () => {
        setCount(Math.floor(countRef.current.value));
      }
    });

    return () => animation.pause();
  }, [end, duration, trigger]);

  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}