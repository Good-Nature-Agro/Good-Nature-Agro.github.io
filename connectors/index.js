(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema

    const farmer =    {
        "farmer_id": 2548,
        "status": 1,
        "first_name": "mwasa",
        "last_name": "I'mj",
        "nrc": "5uow",
        "gender": "female",
        "phone_number": null,
        "growing_rating": 1,
        "team_id": 3669,
        "farm_location": null,
        "district_name": "Lunte",
        "camp_name": "Lubushi",
        "group_name": "Lubu / Group 3",
        "team_name": "Lubu / G3 / Team 3",
        "pea_name": "",
        "fs_name": "",
        "lfs_name": "Milimo Chilobya",
        "loans": [
            {
                "id": 59,
                "down_payment_method": "cash",
                "initial_down_payment_value": 2,
                "full_deposit_paid": 0,
                "package_id": 39,
                "crop_variety_name": "Lungwebungu",
                "crop_class_name": "Sugar bean",
                "package_name": "Lungwebungu Sugar bean - 100 - 0.5ha",
                "pack_price": "850.00",
                "pack_size": "20.00",
                "hectares": "0.50",
                "cash_repayment": "0.00",
                "in_kind_repayment": "100.00",
                "program_name": "SEED - 2023 / 24"
            }
        ]
    };

    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            {
                id: "farmer_id",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "name",
                alias: "Farmer Name",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "nrc",
                alias: "National Registration Card Number",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "phone_number",
                alias: "Phone Number",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "gender",
                alias: "Gender",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "team_id",
                alias: "Team ID",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "farm_location",
                alias: "Farm Location",
                dataType: tableau.dataTypeEnum.geometry
            },
            {
                id: "growing_rating",
                alias: "Growing Rating",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "district_name",
                alias: "District Name",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "camp_name",
                alias: "Camp Name",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "group_name",
                alias: "Group Name",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "team_name",
                alias: "Team Name",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "pea_name",
                alias: "Pea Name",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "fs_name",
                alias: "FS Name",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "lfs_name",
                alias: "LFS Name",
                dataType: tableau.dataTypeEnum.string
            },
            {
                "id": "id",
                "alias": "ID",
                "dataType": tableau.dataTypeEnum.int
            },
            {
                id: "down_payment_method",
                alias: "Down Payment Method",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "initial_down_payment_value",
                alias: "Initial Down Payment Value",
                dataType: tableau.dataTypeEnum.float
            },
            {
                id: "full_deposit_paid",
                alias: "Full Deposit Paid",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "package_id",
                alias: "Package ID",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "crop_variety_name",
                alias: "Crop Variety",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "crop_class_name",
                alias: "Crop Class",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "package_name",
                alias: "Package Name",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "pack_price",
                alias: "Pack Price",
                dataType: tableau.dataTypeEnum.float
            },
            {
                id: "pack_size",
                alias: "Pack Size",
                dataType: tableau.dataTypeEnum.float
            },
            {
                id: "hectares",
                alias: "Hectares",
                dataType: tableau.dataTypeEnum.float
            },
            {
                id: "cash_repayment",
                alias: "Cash Repayment",
                dataType: tableau.dataTypeEnum.float
            },
            {
                id: "in_kind_repayment",
                alias: "In Kind Repayment",
                dataType: tableau.dataTypeEnum.float
            },
            {
                id: "program_name",
                alias: "Program Name",
                dataType: tableau.dataTypeEnum.string
            }
        ];
    
        var tableSchema = {
            id: "farmerEngagementFarmers",
            alias: "Farmer Engagement Farmers Details",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };
    

    myConnector.getData = function (table, doneCallback) {
        var apiKey = 'in2th3GNAweb';
        $.ajax({
            url: `https://api.goodnatureagro.com/fe/farmers/details`,
            headers: {
                'x-api-key': apiKey
            },
            dataType: "json",
            success: function (resp) {
                var feat = resp,
                    tableData = [];
    
                for (var i = 0, len = feat.length; i < len; i++) {
                    var loans = feat[i].loans || []; // Handle the case where loans array is undefined
    
                    for (var j = 0; j < loans.length; j++) {
                        var loanDetails = loans[j];
    
                        tableData.push({
                            "farmer_id": feat[i].farmer_id,
                            "name": feat[i].first_name + " " + feat[i].last_name,
                            "nrc": feat[i].nrc,
                            "phone_number": feat[i].phone_number,
                            "gender": feat[i].gender,
                            "team_id": feat[i].team_id,
                            "farm_location": feat[i].farm_location,
                            "growing_rating": feat[i].growing_rating,
                            "district_name": feat[i].district_name,
                            "camp_name": feat[i].camp_name,
                            "group_name": feat[i].group_name,
                            "team_name": feat[i].team_name,
                            "pea_name": feat[i].pea_name,
                            "fs_name": feat[i].fs_name,
                            "lfs_name": feat[i].lfs_name,
                            "id": loanDetails.id,
                            "down_payment_method": loanDetails.down_payment_method,
                            "initial_down_payment_value": loanDetails.initial_down_payment_value,
                            "full_deposit_paid": loanDetails.full_deposit_paid,
                            "package_id": loanDetails.package_id,
                            "crop_variety_name": loanDetails.crop_variety_name,
                            "crop_class_name": loanDetails.crop_class_name,
                            "package_name": loanDetails.package_name,
                            "pack_price": parseFloat(loanDetails.pack_price),
                            "pack_size": parseFloat(loanDetails.pack_size),
                            "hectares": parseFloat(loanDetails.hectares),
                            "cash_repayment": parseFloat(loanDetails.cash_repayment),
                            "in_kind_repayment": parseFloat(loanDetails.in_kind_repayment),
                            "program_name": loanDetails.program_name
                        });
                    }
    
                    if (loans.length === 0) {
                        tableData.push({
                            "farmer_id": feat[i].farmer_id,
                            "name": feat[i].first_name + " " + feat[i].last_name,
                            "nrc": feat[i].nrc,
                            "phone_number": feat[i].phone_number,
                            "gender": feat[i].gender,
                            "team_id": feat[i].team_id,
                            "farm_location": feat[i].farm_location,
                            "growing_rating": feat[i].growing_rating,
                            "district_name": feat[i].district_name,
                            "camp_name": feat[i].camp_name,
                            "group_name": feat[i].group_name,
                            "team_name": feat[i].team_name,
                            "pea_name": feat[i].pea_name,
                            "fs_name": feat[i].fs_name,
                            "lfs_name": feat[i].lfs_name,
                            // "down_payment_method": null,
                            // "initial_down_payment_value": null,
                            // "full_deposit_paid": null,
                            // "package_id": null,
                            // "package_name": null,
                            // "pack_price": null,
                            // "cash_repayment": null,
                            // "in_kind_repayment": null
                        });
                    }
                }
    
                table.appendRows(tableData);
                doneCallback();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error: " + textStatus, errorThrown);
                doneCallback();
            }
        });
    };
    

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Farmer Engagement Farmers";
            tableau.submit(); 
        });
    });
})();