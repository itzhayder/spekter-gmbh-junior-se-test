import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const Modal = ({ coordinates, open, handleClose }) => {
  const [ name, setName ] = useState('');
  const [ currentCoordinate, setCurrentCoordinate ] = useState(`${coordinates.lat}, ${coordinates.lng}`);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Current coordinate: ', currentCoordinate);
    console.log('Your name: ', name);

    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit} >
          <DialogContent>
            <TextField
              autoComplete="off"
              margin="dense"
              id="coordinate"
              label="Current Coordinates"
              type="text"
              fullWidth
              value={currentCoordinate}
              onInput={e => setCurrentCoordinate(e.target.value)}
            />

            <TextField
              autoFocus
              autoComplete="off"
              margin="dense"
              id="name"
              label="Your Name"
              type="text"
              fullWidth
              value={name}
              onInput={e => setName(e.target.value)}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default Modal;