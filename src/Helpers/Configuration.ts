/**
 * The static configuration.
 */
export class Configuration {
    public static OfficeSearchEndPointUrl = 'https://www.office.com/search?auth=2&q=';
    public static BingSearchEndPointUrl = 'https://www.bing.com/work/search?q=';
    public static OfficeLogoUrl = '/SiteAssets/office.png';
    public static BingLogoUrl = '/SiteAssets/bing.png';
    public static NoPreviewImageUrl = '/SiteAssets/no-preview-image.jpg';

    public static APIOptions = [
        {
            key: 'Graph API',
            text: 'Graph API'
        },
        {
            key: 'REST API',
            text: 'REST API'
        }
    ];

    public static logoDetails = {
        hoverText: 'Back to Home',
        altText: 'Back to home'
    };
    public static filtersList = [
        {
            filterDisplayName: 'File type',
            filterInternalName: 'FileType',
            optionsList: [
                { displayValue: 'PDF', internalValue: 'PDF' },
                { displayValue: 'Email', internalValue: 'email' },
                { displayValue: 'Excel', internalValue: 'xlsx' },
                { displayValue: 'Word', internalValue: 'docx' },
                { displayValue: 'PowerPoint', internalValue: 'pptx' },
                { displayValue: 'OneNote', internalValue: 'one' },
                { displayValue: 'Image', internalValue: 'png' },
                { displayValue: 'Compressed', internalValue: 'Zip' },
                { displayValue: 'Web page', internalValue: 'aspx' }
            ],
            filterType: 'MultiSelect'
        }, {
            filterDisplayName: 'Last modified',
            filterInternalName: 'LastModifiedTime',
            optionsList: [
                { displayValue: 'Past 24 hours', internalValue: 'Past 24 hours' },
                { displayValue: 'Past week', internalValue: 'Past week' },
                { displayValue: 'Past month', internalValue: 'Past month' },
                { displayValue: 'Past 3 months', internalValue: 'Past 3 months' },
                { displayValue: 'Past year', internalValue: 'Past year' },
                { displayValue: 'Older than a year', internalValue: 'Older than a year' }
            ],
            filterType: 'Date'
        }, {
            filterDisplayName: 'Current status',
            filterInternalName: 'Status',
            optionsList: [
                { displayValue: 'New', internalValue: 'New' },
                { displayValue: 'Approved', internalValue: 'Approved' },
                { displayValue: 'Active', internalValue: 'Active' },
                { displayValue: 'In progress', internalValue: 'In progress' },
                { displayValue: 'Resolved', internalValue: 'Resolved' },
                { displayValue: 'Closed', internalValue: 'Closed' }
            ],
            filterType: 'SingleSelect'
        }, {
            filterDisplayName: 'Business',
            filterInternalName: 'Business',
            optionsList: [
                { displayValue: 'Project & Technology', internalValue: 'Project & Technology' },
                { displayValue: 'HR & Corporate', internalValue: 'HR & Corporate' },
                { displayValue: 'Upstream', internalValue: 'Upstream' },
                { displayValue: 'Downstream', internalValue: 'Downstream' },
                { displayValue: 'Chemicals and Products', internalValue: 'Chemicals and Products' }
            ],
            filterType: 'MultiSelect'
        }
    ];

    public static sortingOptions = ['Relevance', 'Modified date (Ascending)', 'Modified date (Descending)', 'Most Viewed', 'Recent Viewed'];
    public static advanceFilterObject = {
        properties: ['(Pick Property)', 'ID', 'Title', 'Author', 'FileType'],
        queries: ['Contains', 'Does not contain', 'Equals', 'Does not equal'],
        value: '',
        operators: ['And', 'Or'],
        showAddProprtyOption: true,
        showRemoveProprtyOption: true,
        selectedProperty: '(Pick Property)',
        selectedQuery: 'Contains',
        selectedOperator: 'And'
    };

    public static fieldsToRetrieveForSharePointSource = [
        "id",
        "name",
        "write",
        "title",
        "url",
        "createdby",
        "filename",
        "fileextension",
        "contenttype",
        "contentclass",
        "path",
        "DefaultEncodingURL",
        "viewcount",
        "viewslifetimeuniqueusers",
        "modifiedby",
        "lastmodifiedtime",
        "hithighlightedsummary",
        "docid",
        "created",
        "author",
        "parentlink",
        "spsiteurl",
        "serverredirectedpreviewurl",
        "spweburl"
    ];

    public static fieldsToRetrieveForExternalSource = [
        "title",
        "name",
        "lastmodifieddatetime",
        "resultsnippet",
        "SysUpdatedOn",
        "url",
        "HitHighlightedSummary",
        "ShortDescription",
        "AcessUrl"
    ];

    public static fieldsToRetrieveForMessagesSource = [
        "createddatetime",
        "lastmodifieddateTime",
        "receiveddatetime",
        "sentdatetime",
        "hasattachments",
        "subject",
        "bodypreview",
        "importance",
        "weblink",
        "inferenceclassification",
        "replyto",
        "sender",
        "from",
        "isdraft",
        "isread"
    ];

    public static DateFilterOptionsList = [
        { displayValue: 'Past 24 hours', internalValue: 'Past 24 hours' },
        { displayValue: 'Past week', internalValue: 'Past week' },
        { displayValue: 'Past month', internalValue: 'Past month' },
        { displayValue: 'Past 3 months', internalValue: 'Past 3 months' },
        { displayValue: 'Past year', internalValue: 'Past year' },
        { displayValue: 'Older than a year', internalValue: 'Older than a year' }
    ]
}