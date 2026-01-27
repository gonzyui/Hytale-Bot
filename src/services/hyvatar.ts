import { SkinOptions } from "../types";

const BASE_URL = "https://hyvatar.io";

export function getHyvatarUrl(options: SkinOptions): string {
    const { username, type, size, rotation } = options;
    
    let endpoint = `/render/full/${username}`;
    if (type === 'head') endpoint = `/render/${username}`;
    if (type === 'cape') endpoint = `/render/cape/${username}`;

    const params = new URLSearchParams({
        size: size.toString(),
        rotate: rotation.toString()
    });

    return `${BASE_URL}${endpoint}?${params.toString()}`;
}