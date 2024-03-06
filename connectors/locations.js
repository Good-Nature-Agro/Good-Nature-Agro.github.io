(function () {
    // Create the connector object
    var locationsConnector = tableau.makeConnector();

    // Define the schema for the farmer details data
    locationsConnector.getSchema = function (schemaCallback) {
        var cols = [
            {
                id: "id",
                alias: "Location ID",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "name",
                alias: "Location Name",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "latitude",
                alias: "Latitude",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "longitude",
                alias: "Longitude",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "category",
                alias: "Category",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "details",
                alias: "Details",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "created_at",
                alias: "Creation Date",
                dataType: tableau.dataTypeEnum.date,
            },
            {
                id: "updated_at",
                alias: "Update Date",
                dataType: tableau.dataTypeEnum.date,
            },

        ];

        var tableSchema = {
            id: "locationsConnector",
            alias: "Locations",
            columns: cols,
        };

        schemaCallback([tableSchema]);
    };

    // Fetch and process the farmer details data
    locationsConnector.getData = function (table, doneCallback) {
        var apiKey = "in2th3GNAweb";
        $.ajax({
            url: `https://api.goodnatureagro.com/fe/locations`,
            headers: {
                "x-api-key": apiKey,
            },
            dataType: "json",
            success: function (resp) {
                var tableData = [];
                
                // Process each data item
                resp.forEach(function(item) {
                    // Extract relevant fields
                    var rowData = {
                        "id": item.id,
                        "name": item.name,
                        "latitude": item.location.y,
                        "longitude": item.location.x,
                        "category": item.category || "N/A", // Use "N/A" if category is not available
                        "details": item.details || "N/A", // Use "N/A" if details are not available
                        "created_at": item.created_at,
                        "updated_at": item.updated_at,
                    };
    
                    // Push the row data to the table data array
                    tableData.push(rowData);
                });
    
                // Append the formatted data to Tableau
                table.appendRows(tableData);
    
                // Signal that data processing is complete
                doneCallback();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error: " + textStatus, errorThrown);
                doneCallback();
            }
        });
    };

    tableau.registerConnector(locationsConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Locations Data";
            tableau.submit();
        });
    });
})();
