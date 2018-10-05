export const NONE = 0;
export const CONNECTING = 1;
export const LOADINGBLOCK = 2;
export const VERIFYBLOCK = 3;
export const RESCANNING = 4;

export default {
    NONE,
    CONNECTING,     // connect ECONNREFUSED 127.0.0.1:9888
    LOADINGBLOCK,   // Loading block index...
    VERIFYBLOCK,    // Verifying blocks...
    RESCANNING,     // Rescanning...
};
