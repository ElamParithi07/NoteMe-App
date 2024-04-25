import { combineReducers } from 'redux';
import { UserReducer} from './UserReducer'

const RootReducer = combineReducers({
    userToken: UserReducer,
})

export default RootReducer;