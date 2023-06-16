import { Router } from '@angular/router';
import { GlobalConstants } from './global-constants';

export function isAllowedRol(allowedRoles: number[], seRolid: number) {
    for (const rol of allowedRoles) {
        if (rol == seRolid) {
            break
        } else {
            return false
        }
    }
    return true
}

export function esCaja() {
    return GlobalConstants.SEUSUARIO.serolId == 5
}

export function esCoordinador() {
    return GlobalConstants.SEUSUARIO.serolId == 4
}

export function esGerente() {
    return GlobalConstants.SEUSUARIO.serolId == 3
}

export function esAdministrador() {
    return GlobalConstants.SEUSUARIO.serolId == 2
}