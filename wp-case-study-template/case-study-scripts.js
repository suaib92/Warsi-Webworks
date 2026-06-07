/**
 * Case Study JS Interactions
 * Handles intersection observers for animating result statistics on scroll.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Stat Counter Animation
    const stats = document.querySelectorAll('.cs-result-num');
    
    if (stats.length === 0) return;

    const animateValue = (obj, start, end, duration, format) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // easeOutQuart easing function for smooth deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            let current = Math.floor(easeProgress * (end - start) + start);
            
            // Reattach any suffix/prefix like '+', '%', etc. if format exists
            if (format) {
                // simple heuristic: if format has letters/symbols before, prepend it. If after, append.
                // We'll just do a basic replace or just append/prepend based on position.
                // Usually it's something like '+' or '%' at the end, or '$' at the beginning.
                if (['$', '£', '€'].includes(format[0])) {
                    obj.innerHTML = format + current;
                } else {
                    obj.innerHTML = current + format;
                }
            } else {
                obj.innerHTML = current;
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseInt(target.getAttribute('data-target')) || 0;
                const format = target.getAttribute('data-format') || '';
                
                if (endVal > 0) {
                    animateValue(target, 0, endVal, 2000, format);
                }
                
                // Unobserve after animating once
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        observer.observe(stat);
    });
});
