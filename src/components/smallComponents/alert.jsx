import React, {useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

export default function AlertDismissibleExample() {
        const [show, setShow] = useState(true);
      
        if (show) {
          return (
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>No has seleccionado un avatar!</Alert.Heading>
              <p>
                Para elegir uno, puedes ir a tu perfil, también puedes agregar una biografía y otros datos.
              </p>
            </Alert>
          );
        }
        return <Button onClick={() => setShow(true)} className='hidde'>Show Alert</Button>;
}
