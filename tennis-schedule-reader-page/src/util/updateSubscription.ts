const REPO_OWNER = "jjchrisdiehl";
const REPO_NAME = "tennis-schedule-reader-page";
const WORKFLOW_FILENAME = "update-subscriptions.yml";

/**
 * Extracts keys from the PushSubscription object.
 * @param subscription - The PushSubscription object from the browser.
 * @returns A transformed object with endpoint and encoded keys.
 */
function formatSubscription(subscription: PushSubscription) {
    return {
        endpoint: subscription.endpoint,
        keys: {
            p256dh: subscription.getKey("p256dh")
                ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey("p256dh")!)))
                : "",
            auth: subscription.getKey("auth")
                ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey("auth")!)))
                : "",
        },
    };
}

/**
 * Triggers the GitHub Action to update push subscriptions.
 * @param subscription - The push subscription object.
 * @param action - "subscribe" or "unsubscribe".
 */
export async function updateSubscription(subscription: PushSubscription, action: "subscribe" | "unsubscribe"): Promise<void> {
    try {
        const formattedSubscription = formatSubscription(subscription);

        const response = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${WORKFLOW_FILENAME}/dispatches`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/vnd.github.v3+json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ref: "main",
                    inputs: { subscription: JSON.stringify(formattedSubscription), action },
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`GitHub API responded with status: ${response.status}`);
        }

        console.log("✅ GitHub Action triggered successfully.");
    } catch (error) {
        console.error("❌ Error triggering GitHub Action:", error);
    }
}