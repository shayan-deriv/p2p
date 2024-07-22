import { TrackJS } from 'trackjs';
import { useAuthData } from '@deriv-com/api-hooks';

const { VITE_TRACKJS_TOKEN } = process.env;

/**
 * Custom hook to initialize TrackJS.
 * @returns {Object} An object containing the `init` function.
 */
const useTrackjs = () => {
    const { activeLoginid } = useAuthData();
    const init = () => {
        if (!TrackJS.isInstalled()) {
            TrackJS.install({
                application: 'deriv-p2p',
                dedupe: false,
                enabled: location.hostname !== 'localhost',
                token: VITE_TRACKJS_TOKEN!,
                userId: activeLoginid || 'undefined',
                version: (document.querySelector('meta[name=version]') as HTMLMetaElement)?.content,
            });
        }
    };

    return { init };
};

export default useTrackjs;