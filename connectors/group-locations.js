(function () {
    // Create the connector object
    var groupsConnector = tableau.makeConnector();

    // Define the schema for the group details data
    groupsConnector.getSchema = function (schemaCallback) {
        var cols = [
            {
                id: "group_id",
                alias: "Group ID",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "group_name",
                alias: "Group Name",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "distribution_point_id",
                alias: "Distribution Point ID",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "buyback_point_id",
                alias: "Buyback Point ID",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "camp_name",
                alias: "Camp Name",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "district_name",
                alias: "District Name",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "pea_name",
                alias: "PEA Name",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "fs_name",
                alias: "FS Name",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "lfs_name",
                alias: "LFS Name",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "buyback_point_id",
                alias: "Buyback Point ID",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "buyback_name",
                alias: "Buyback Point Name",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "buyback_latitude",
                alias: "Buyback Latitude",
                dataType: tableau.dataTypeEnum.float,
            },
            {
                id: "buyback_longitude",
                alias: "Buyback Longitude",
                dataType: tableau.dataTypeEnum.float,
            },
            {
                id: "buyback_created_at",
                alias: "Buyback Creation Date",
                dataType: tableau.dataTypeEnum.datetime,
            },
            {
                id: "buyback_updated_at",
                alias: "Buyback Update Date",
                dataType: tableau.dataTypeEnum.datetime,
            },
            {
                id: "buyback_category",
                alias: "Buyback Category",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "buyback_details",
                alias: "Buyback Details",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "distribution_point_id",
                alias: "Distribution Point ID",
                dataType: tableau.dataTypeEnum.int,
            },
            {
                id: "distribution_name",
                alias: "Distribution Point Name",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "distribution_latitude",
                alias: "Distribution Latitude",
                dataType: tableau.dataTypeEnum.float,
            },
            {
                id: "distribution_longitude",
                alias: "Distribution Longitude",
                dataType: tableau.dataTypeEnum.float,
            },
            {
                id: "distribution_created_at",
                alias: "Distribution Creation Date",
                dataType: tableau.dataTypeEnum.datetime,
            },
            {
                id: "distribution_updated_at",
                alias: "Distribution Update Date",
                dataType: tableau.dataTypeEnum.datetime,
            },
            {
                id: "distribution_category",
                alias: "Distribution Category",
                dataType: tableau.dataTypeEnum.string,
            },
            {
                id: "distribution_details",
                alias: "Distribution Details",
                dataType: tableau.dataTypeEnum.string,
            },
        ];

        var tableSchema = {
            id: "groupsConnector",
            alias: "Groups Location Data",
            columns: cols,
        };

        schemaCallback([tableSchema]);
    };

    // Fetch and process the group details data
    groupsConnector.getData = function (table, doneCallback) {
        var apiKey = "in2th3GNAweb";
        $.ajax({
            url: `https://api.goodnatureagro.com/fe/locations/details`,
            headers: {
                "x-api-key": apiKey,
            },
            dataType: "json",
            success: function (resp) {
                var tableData = [];
                
                // Process each data item
                resp.forEach(function(item) {
                    var rowData = {
                        "group_id": item.group_id,
                        "group_name": item.group_name,
                        "distribution_point_id": item.distribution_point_id,
                        "buyback_point_id": item.buyback_point_id,
                        "camp_name": item.camp_name,
                        "district_name": item.district_name,
                        "pea_name": item.pea_name || "N/A",
                        "fs_name": item.fs_name || "N/A",
                        "lfs_name": item.lfs_name || "N/A",
                    };

                    // Add buyback point details if available
                    if (item.buyback_point) {
                        rowData["buyback_point_id"] = item.buyback_point.id;
                        rowData["buyback_name"] = item.buyback_point.name;
                        rowData["buyback_latitude"] = item.buyback_point.location.y;
                        rowData["buyback_longitude"] = item.buyback_point.location.x;
                        rowData["buyback_created_at"] = item.buyback_point.created_at;
                        rowData["buyback_updated_at"] = item.buyback_point.updated_at;
                        rowData["buyback_category"] = item.buyback_point.category || "N/A";
                        rowData["buyback_details"] = item.buyback_point.details || "N/A";
                    }

                    // Add distribution point details if available
                    if (item.distribution_point) {
                        rowData["distribution_point_id"] = item.distribution_point.id;
                        rowData["distribution_name"] = item.distribution_point.name;
                        rowData["distribution_latitude"] = item.distribution_point.location.y;
                        rowData["distribution_longitude"] = item.distribution_point.location.x;
                        rowData["distribution_created_at"] = item.distribution_point.created_at;
                        rowData["distribution_updated_at"] = item.distribution_point.updated_at;
                        rowData["distribution_category"] = item.distribution_point.category || "N/A";
                        rowData["distribution_details"] = item.distribution_point.details || "N/A";
                    }

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

    tableau.registerConnector(groupsConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Groups Location Data";
            tableau.submit();
        });
    });
})();
