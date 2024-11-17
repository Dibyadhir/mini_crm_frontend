import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const ViewContData = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [data, setData] = React.useState([]);
    const [filterContact, setFilterContact] = useState(data)
    const [viewContData, setViewContData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        jobTitle: '',
        contactNo: ''
    })
    const [editCompData, setEditCompData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        jobTitle: '',
        contactNo: '',
    })
    const [loader, setLoader] = useState(true)
    const [noError, setNoError] = useState(false)
    const [prevData, setPrevData] = useState(editCompData)
    const [updates, setUpdates] = useState(0)


    useEffect(() => {
        axios.get('http://localhost:8080/viewcontactdata')
            .then(res => {
                console.log(res)
                setContacts(res.data)
                const fetchedData = res.data.map((contact, index) => ({
                    id: contact.id || index + 1, 
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    email: contact.email,
                    contactNo: contact.contactNo,
                    company: contact.company,
                    jobTitle: contact.jobTitle,
                }));
                setContacts(fetchedData);
                setData(res.data)
                setFilterContact(res.data)
                setLoader(false)
            })
            .catch(err => {
                console.log(err)
                setLoader(false)
            })
    }, [])


    const handleEdit = (contact) => {
        console.log('Edit contact:', contact);
        // Add edit functionality here
    };

    const handleDelete = (id) => {
        console.log('Delete contact with ID:', id);
        // Add delete functionality here
    };


    const columns = [
        { field: "id", headerName: "SL No", width: 90 }, // SL No (assuming ID is unique and sequential)
        { field: "firstName", headerName: "First Name", width: 150 },
        { field: "lastName", headerName: "Last Name", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "contactNo", headerName: "Phone Number", width: 150 },
        { field: "company", headerName: "Company", width: 150 },
        { field: "jobTitle", headerName: "Job Title", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Box sx={{ height: { xs: 'auto', lg: '90vh' }, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', p: 2, }}>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { xs: '95%', md: '75%', lg: '50%' }, backgroundColor: '#FFFFFF', borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
                <Typography variant="h5" component="h5" textAlign="center" mb={3}> View Contact </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}>

                    <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                            rows={contacts}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            disableSelectionOnClick
                        />
                    </div>

                </Box>
            </Box>
        </Box>
    );
};

export default ViewContData;
