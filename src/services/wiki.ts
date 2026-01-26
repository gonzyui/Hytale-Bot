import { WikiResult } from '../types';
import axios from 'axios';

const API_URL = "https://hytalewiki.org/api.php";

export async function getHytaleVisuals(userQuery: string): Promise<WikiResult | null> {
    try {
        const searchRes = await axios.get(API_URL, {
            params: { action: "opensearch", search: userQuery, limit: 1, format: "json" }
        });

        const realTitle = searchRes.data[1][0];
        if (!realTitle) return null;

        const response = await axios.get(API_URL, {
            params: {
                action: "query",
                prop: "pageimages|extracts|info",
                titles: realTitle,
                pithumbsize: 600,
                exintro: 1,
                explaintext: 1,
                inprop: "url",
                redirects: 1,
                format: "json"
            }
        });

        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pageId === "-1") return null;

        const pageData = pages[pageId];

        return {
            title: pageData.title,
            description: pageData.extract ? pageData.extract.substring(0, 300) + "..." : "No description.",
            imageUrl: pageData.thumbnail ? pageData.thumbnail.source : null,
            url: pageData.fullurl || `https://hytalewiki.org/wiki/${pageData.title.replace(/ /g, "_")}`
        };

    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}