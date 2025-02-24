import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_PAT });
const REPO_OWNER = "jjchrisdiehl";
const REPO_NAME = "tennis-schedule-reader-page";

/**
 * Fetches the existing subscriptions from GitHub Secrets.
 */
async function getSubscriptions() {
    try {
        const secret = await octokit.actions.getRepoSecret({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            secret_name: "SUBSCRIPTIONS_JSON",
        });

        return secret.encrypted_value
            ? JSON.parse(Buffer.from(secret.encrypted_value, "base64").toString())
            : [];
    } catch (error) {
        console.error("❌ Error fetching push subscriptions:", error);
        return [];
    }
}

/**
 * Updates the GitHub Secret with the new subscription list.
 */
async function updateGitHubSecret(subscriptions) {
    try {
        await octokit.actions.createOrUpdateRepoSecret({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            secret_name: "SUBSCRIPTIONS_JSON",
            encrypted_value: Buffer.from(JSON.stringify(subscriptions)).toString("base64"),
        });

        console.log("✅ GitHub Secret updated successfully.");
    } catch (error) {
        console.error("❌ Error updating GitHub Secret:", error);
    }
}

/**
 * Handles subscription updates.
 */
export async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { subscription, action } = req.body;
        let subscriptions = await getSubscriptions();

        if (action === "subscribe") {
            subscriptions.push(subscription);
        } else if (action === "unsubscribe") {
            subscriptions = subscriptions.filter((sub) => sub.endpoint !== subscription.endpoint);
        }

        await updateGitHubSecret(subscriptions);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("❌ Error handling subscription:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}