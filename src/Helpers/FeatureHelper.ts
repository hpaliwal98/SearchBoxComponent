/**
 * Class for managing feature flags.
 */
export class FeatureHelper {

    static allowedFeaturesList: string[];

    /**
     * Method to set all feature flags.
     * @param enabledFeaturesList list of enabled features for current user.
     */
    public static SetFeatureFlags(enabledFeaturesList: string[]) {
        FeatureHelper.allowedFeaturesList = enabledFeaturesList;
    }

    /**
     * Method to retrieve weather mentioned feature is enabled or not.
     * @param featureName the name of the feature.
     * @returns the featue availability status.
     */
    public static IsFeatureEnabled(featureName: string) {
        return this.allowedFeaturesList.indexOf(featureName) > -1;
    }
}