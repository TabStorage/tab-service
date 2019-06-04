import { Router } from "express";

export interface Routable {
    routes(): Router
}