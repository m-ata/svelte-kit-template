import { STAY_COLUMNS } from "$lib/constants"
import { USER_COLUMNS } from "$lib/constants"

export const getColumns = (table: string) => {

    switch (table) {
        case 'stay':
            return STAY_COLUMNS;
        case 'user':
            return USER_COLUMNS;
        default:
            return []
    }
    
}
