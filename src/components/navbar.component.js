import {React} from'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
function Navbar() {
    return (
        <div>
        <AppBar position="fixed">
          <Toolbar style={{backgroundColor:'maroon'}}>Gallery</Toolbar>
        </AppBar>
        <Toolbar />
      </div>
    );
  }

  export default  Navbar