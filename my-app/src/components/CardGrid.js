import React from 'react';

import Card from './Card';
// import Followers from './Followers';

const CardGrid = props => {
    // console.log(props)
    return (
        <div>
            {/* single card for myself */}
            <Card key={props.user.node_id} user={props.user} />
            {/* mapping over the followers array and displaying each card */}
            {props.followers.map(user => (
                <Card key={user.node_id} user={user}/>
            ))}
        </div>
    )
}

export default CardGrid;