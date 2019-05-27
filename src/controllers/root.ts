import express from "express";
import Folders from "@models/folders";

export async function getRoot(user_id: number) {
    // TODO: Add Root Table for performance
    //let folder = new Folders();
    //folder.query(`SELECT * FROM ${folder.attrs.table} WHERE owner_id = ${user_id}`)
}