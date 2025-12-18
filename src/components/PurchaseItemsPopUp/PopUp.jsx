import * as React from "react";
import {Modal, Box, IconButton, Dialog, DialogTitle, DialogContent} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function PopUp({ open, onClose , headers, body}){
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {headers}
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <center>
                    {body}
                </center>
            </DialogContent>
        </Dialog>
    );

}