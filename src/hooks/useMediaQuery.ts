import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    });

    useEffect(() => {
        const media = window.matchMedia(query);
        
        // Set initial value
        setMatches(media.matches);

        // Create listener
        const listener = (event: MediaQueryListEvent | MediaQueryList) => {
            setMatches(event.matches);
        };
        
        // Modern browsers
        if (media.addEventListener) {
            media.addEventListener('change', listener);
            return () => media.removeEventListener('change', listener);
        } else {
            // Fallback for older browsers
            media.addListener(listener);
            return () => media.removeListener(listener);
        }
    }, [query]);

    return matches;
}

// Convenience hooks for common breakpoints
export function useIsMobile(): boolean {
    return useMediaQuery('(max-width: 768px)');
}

export function useIsTablet(): boolean {
    return useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
}

export function useIsDesktop(): boolean {
    return useMediaQuery('(min-width: 1025px)');
}

