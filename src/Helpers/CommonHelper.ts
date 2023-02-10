import * as _ from "lodash";
import { Configuration } from "./Configuration";

export class CommonHelper {

    /**
     * get parameter by name from query string.
     */
    public static GetParameterByNameFromQueryString(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    /**
     * to navigate to target page.
     * @param targetLink the target link.
     * @param target target source.
     */
    public static NavigateToTargetLink(targetLink: string, target: string) {
        switch (target) {
            case 'home':
                window.open(targetLink, '_blank');
                break;
            case 'office':
                var currentSearchTerm = CommonHelper.GetParameterByNameFromQueryString('q');
                window.open(targetLink + currentSearchTerm, '_blank');
                break;
            case 'bing':
                var currentSearchTerm = CommonHelper.GetParameterByNameFromQueryString('q');
                window.open(targetLink + currentSearchTerm, '_blank');
                break;
        }
    }

    /**
     * to retreive entity types based on sourve type.
     * @param sourceType the source type.
     * @param target entity types list.
     */
    public static GetEntityTypes(sourceType: string) {
        switch (sourceType) {
            case 'SharePoint':
                return ["listItem"];
                break;
            case 'Messages':
                return ["message"];
                break;
            case 'External':
                return ["externalItem"];
                break;
            case 'People':
                return ["person"];
                break;
        }
    }

    /**
     * to retreive list of fields need to be retreived based on sourve type.
     * @param sourceType the source type.
     * @param target fields list.
     */
    public static GetFieldsToRetrieve(sourceType: string) {
        switch (sourceType) {
            case 'SharePoint':
                return Configuration.fieldsToRetrieveForSharePointSource;
                break;
            case 'Messages':
                return Configuration.fieldsToRetrieveForMessagesSource;
                break;
            case 'External':
                return Configuration.fieldsToRetrieveForExternalSource;
                break;
            case 'People':
                return null;
                break;
        }
    }

    /**
     * Method to get Date range for selected option.
     * @param selectedDateOption selected date option to filter on.
     * @return the date range value.
     */
    public static GetDateRange(selectedDateOption: string) {
        var dateRange = '';
        var startDate = new Date();
        var endDate = new Date();
        switch (selectedDateOption) {
            case 'Past 24 hours':
                startDate.setDate(startDate.getDate() - 1);
                dateRange = '(range(' + startDate.toISOString() + ', ' + endDate.toISOString() + '))';
                break;
            case 'Past week':
                startDate.setDate(startDate.getDate() - 7);
                dateRange = '(range(' + startDate.toISOString() + ', ' + endDate.toISOString() + '))';
                break;
            case 'Past month':
                startDate.setMonth(startDate.getMonth() - 1);
                dateRange = '(range(' + startDate.toISOString() + ', ' + endDate.toISOString() + '))';
                break;
            case 'Past 3 months':
                startDate.setMonth(startDate.getMonth() - 3);
                dateRange = '(range(' + startDate.toISOString() + ', ' + endDate.toISOString() + '))';
                break;
            case 'Past year':
                startDate.setMonth(startDate.getMonth() - 12);
                dateRange = '(range(' + startDate.toISOString() + ', ' + endDate.toISOString() + '))';
                break;
            case 'Older than a year':
                endDate.setMonth(endDate.getMonth() - 12);
                dateRange = '(range(min, ' + endDate.toISOString() + '))';
                break;
        }
        return dateRange;
    }

    /**
     * Method to extract start and end dates from filter values.
     * @param customDateFilters custom date filters.
     * @param dateType type of the date.
     * @returns extracted date values.
     */
    public static ExtractDate(customDateFilters: any, dateType: string) {
        if (customDateFilters && customDateFilters.length > 0) {
            var customDateFilterValue = customDateFilters[0].filterValue;
            if (customDateFilterValue) {
                customDateFilterValue = customDateFilterValue.replace('(range(', '').replace('))', '');
                var customDateFilterValues = customDateFilterValue.split(',');
                switch (dateType) {
                    case 'StartDate':
                        return customDateFilterValues[0].trim();
                        break;
                    case 'EndDate':
                        return customDateFilterValues[1].trim();
                        break;
                }
            }
        }
        return null;
    }

    /**
     * Method to validate weather the input data is a valid JSON or not.
     * @param inputData input data to validate.
     * @returns weather the input data is a valid JSON or not.
     */
    public static IsValidJson(inputData: string) {
        try {
            JSON.parse(inputData);
        } catch (ex) {
            return false;
        }
        return true;
    }

    /**
     * Method to retrieve current site Url.
     * @returns current site Url.
     */
    public static GetCurrentSiteUrl() {
        var siteUrl = '';
        var currentPath = window.location.href.toString().toLowerCase();
        if (currentPath.indexOf('/pages/') > 0) {
            siteUrl = currentPath.split('/pages/')[0];
        } else if (currentPath.indexOf('/sitepages/') > 0) {
            siteUrl = currentPath.split('/sitepages/')[0];
        } else {
            siteUrl = window.location.origin + window.location.pathname;
        }
        return siteUrl;
    }

    /**
     * Method to retrieve content source.
     * @param verticalDetails vertical details.
     * @returns the content source value.
     */
    public static GetContentSource(verticalDetails: any) {
        const contentSource = (verticalDetails.sourceType == 'External' && verticalDetails.connectorId) ? verticalDetails.connectorId : null;
        return contentSource;
    }

    /**
     * Method to retrieve fields to export.
     * @param sourceType the source type.
     * @param exportFieldsJson fields to export Json.
     * @returns the list of fields to export.
     */
    public static GetFieldsToExport(sourceType: string, exportFieldsJson: any) {
        var fieldsToExport = [];
        exportFieldsJson = (exportFieldsJson) ? JSON.parse(exportFieldsJson) : [];
        switch (sourceType) {
            case 'SharePoint':
            case 'Messages':
            case 'External':
                fieldsToExport = exportFieldsJson.map((item) => {
                    return item.internalName
                });
                break;
            case 'People':
                fieldsToExport = null;
                break;
        }

        return fieldsToExport;
    }

    /**
     * Method to retrieve sort by field.
     * @param appliedSortDetails applied sorting details.
     * @returns the sort by field name.
     */
    public static GetSortByField(appliedSortDetails: any) {
        const fieldToSortResulsOn = appliedSortDetails && appliedSortDetails.name != "relevance" ? appliedSortDetails.name : null;
        return fieldToSortResulsOn;
    }

    /**
     * Method to retrieve sort order weather descening true or false.
     * @param appliedSortDetails applied sorting details.
     * @returns the sort order.
     */
    public static GetSortOrder(appliedSortDetails: any) {
        const sortOrderIsDescending = appliedSortDetails && appliedSortDetails.name != "relevance" ? appliedSortDetails.isDescending : null;
        return sortOrderIsDescending;
    }

    /**
     * Method to retrieve filter/aggregation queries.
     * @param appliedFiltersList applied filter details.
     * @returns the aggregation filters.
     */
    public static GetFiltersQuery(appliedFiltersList: any) {
        var aggregationFilters = [];
        if (appliedFiltersList && appliedFiltersList.length > 0) {
            var groupedResult = _.groupBy(appliedFiltersList, item => item.filterName);
            if (Object.keys(groupedResult) && Object.keys(groupedResult).length > 0) {
                Object.keys(groupedResult).map(function (key, index) {
                    var filterObject = key + ":";
                    if (groupedResult[key].length == 1) {
                        filterObject = filterObject + groupedResult[key][0].filterValue;
                    } else {
                        var filterValues = '';
                        groupedResult[key].map(function (filter, index) {
                            filterValues = filterValues + "," + groupedResult[key][index].filterValue;
                        });
                        filterValues = filterValues.substring(1);
                        filterObject = filterObject + "or(" + filterValues + ")";
                    }
                    aggregationFilters.push(filterObject);
                });
            }
        }

        return aggregationFilters;
    }

    /**
    * Method to update search to inject query template.
    * @param queryTemplate the query template.
    * @param currentSearchTerm the search term.
    * @returns the updated query.
    */
    public static UpdateQueryForQueryTemplate(queryTemplate: string, currentSearchTerm: string) {
        const updatedQuery = queryTemplate ? queryTemplate + ' ' + currentSearchTerm : currentSearchTerm;
        return updatedQuery;
    }

    /**
     * Method to prepare the query based on restricted search scope. 
     * @param restrictedSitesScope restricted sites.
     * @param verticalDetails vertical details.
     * @returns query for restricted search scope.
     */
    public static GetRestrictedSearchScopeQuery(restrictedSitesScope: any, verticalDetails: any) {
        var siteUrls = [];
        restrictedSitesScope && verticalDetails.sourceType == 'SharePoint' && restrictedSitesScope.map((item, index) => {
            if (item.value) {
                siteUrls.push('"' + item.value.toUpperCase().split('/SITES/')[1] + '"');
            }
        });

        if (siteUrls.length > 0) {
            var restrictedSitesScopeQuery = 'SPSiteUrl:(' + siteUrls.join(' OR ') + ')';
            return restrictedSitesScopeQuery;
        }

        return null;
    }
}