import { ErrorHandler, Injectable, NgZone } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private zone: NgZone) { }

    handleError(error: any) {
        this.zone.run(() => {
            console.error('Core Error:', error);

            // Forward the error to GA4 as a standard 'exception' event.
            // This lets you see runtime JavaScript errors in your GA4 Events report.
            // We send only a short description — never full stack traces — to GA4.
            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                const description = error?.message
                    ? String(error.message).substring(0, 150)
                    : 'Unknown error';

                window.gtag('event', 'exception', {
                    description,
                    fatal: false
                });
            }
        });
    }
}

