// Imports
import fs from 'fs';
import {google} from 'googleapis';
import {GoogleAuth} from 'google-auth-library';

/**
 * Google Service for modifying spreadsheets
 */
class Google {
    private static auth: GoogleAuth | null; // Auth
    public static shared = new Google(); // Shared instance

    /**
     * Configures the Google instance
     */
    constructor() {
        if (fs.existsSync('google-key.json')) {
            Google.auth = new google.auth.GoogleAuth({
                keyFile: 'google-key.json',
                scopes: 'https://www.googleapis.com/auth/spreadsheets',
            });
        } else {
            throw new Error('[ERROR] Could not load Google file');
        }
    }

    async getClientObject() {
        const authClientObject = await this.auth.getClient();
        const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
        const spreadsheetId = "1VpNYpNJkgLtGhuKfHX3uM9jWzGDbY4bWl8aVrIfjjC0";
        const values = await googleSheetsInstance.spreadsheets.values.get({spreadsheetId, range: 'A1'});
        console.log(values.data.values);

    }
}

export default new Google();