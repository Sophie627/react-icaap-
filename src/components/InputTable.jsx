import React from "react";

import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import SaveAlt from "@material-ui/icons/SaveAlt";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Add from "@material-ui/icons/Add";
import Check from "@material-ui/icons/Check";
import FilterList from "@material-ui/icons/FilterList";
import Remove from "@material-ui/icons/Remove";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import MaterialTable from "material-table";

export default function InputTable(props) {
    const [state, setState] = React.useState({
        columns: [
            {
                title: "Name",
                field: "Name",
                cellStyle: {
                    width: "30%",
                    maxWidth: "30%",
                    fontSize: 12,
                    textAlign: "left",
                },
                headerStyle: {
                    width: "30%",
                    maxWidth: "30%",
                    textAlign: "left",
                },
            },
            {
                title: "Exposure",
                field: "EAD",
                type: "numeric",
                cellStyle: {
                    width: 20,
                    maxWidth: 20,
                    fontSize: 12,
                    textAlign: "left",
                },
                headerStyle: {
                    width: 50,
                    maxWidth: 50,
                    textAlign: "left",
                },
            },
            {
                title: "Def. Prob.",
                field: "PD",
                type: "numeric",
                cellStyle: {
                    width: 25,
                    maxWidth: 25,
                    fontSize: 12,
                    textAlign: "left",
                },
                headerStyle: {
                    width: 20,
                    maxWidth: 20,
                    textAlign: "left",
                },
            },
            {
                title: "LGD",
                field: "LGD",
                type: "numeric",
                cellStyle: {
                    width: 20,
                    maxWidth: 20,
                    fontSize: 12,
                    textAlign: "left",
                },
                headerStyle: {
                    width: 20,
                    maxWidth: 12,
                    textAlign: "left",
                },
            },
            {
                title: "Corr",
                field: "w",
                type: "numeric",
                cellStyle: {
                    width: 20,
                    maxWidth: 20,
                    fontSize: 12,
                    textAlign: "left",
                },
                headerStyle: {
                    width: 20,
                    maxWidth: 20,
                    textAlign: "left",
                },
            },
        ],
        // data: [{ name: "ABC", ead: 54, pd: 1987, lgd: 63, corr: 4 }],
        data: props.data,
    });

    console.log("DATA IN TABLE: ", props.data);
    console.log("DATA IN TABLE: ", state.data);
    return (
        <div style={{ fontSize: 10, maxWidth: "100%" }}>
            <MaterialTable
                icons={{
                    Check: Check,
                    DetailPanel: ChevronRight,
                    Delete: DeleteOutline,
                    Export: SaveAlt,
                    Filter: FilterList,
                    FirstPage: FirstPage,
                    LastPage: LastPage,
                    NextPage: ChevronRight,
                    PreviousPage: ChevronLeft,
                    Search: Search,
                    ThirdStateCheck: Remove,
                    Add: Add,
                    SortArrow: ArrowDownward,
                    Clear: Clear,
                    Edit: Edit,
                    ViewColumn: ViewColumn,
                    ResetSearch: Clear,
                }}
                options={{
                    headerStyle: { fontSize: 12, fontWeight: "bold" },
                    rowStyle: {
                        // color: "black",
                        backgroundColor: "#EEE",
                    },
                    actionsCellStyle: {
                        fontSize: "small", //doesn't work
                    },
                    // showTitle: false,
                    sorting: false,
                    // search: false,
                    padding: "dense",
                    exportButton: true,
                }}
                title="Counterparty Info."
                columns={state.columns}
                data={props.data}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                }}
            />
        </div>
    );
}
