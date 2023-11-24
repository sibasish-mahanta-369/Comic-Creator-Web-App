import { Card } from '@mui/material';

export default function DisplayImage(props){
    return(
        <Card sx={{width:'max-content', maxWidth:'90vw'}}>
            <img src={props.iurl} alt="Result"/>
        </Card>
    )
}

