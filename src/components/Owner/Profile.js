import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Rating from './Rating';
// import Random from  '../../RandomUserApi'
// import logo from '../../images/t2rlogo.png'
import camera from '../../Images/Bitmap-1.png';
import vr from '../../Images/Bitmap-8.png';
import cameratwo from '../../Images/Bitmap-10.png';
import EditItem from './EditItemModal';
import { getItems } from '../../actions/Items/CRUD/getItems';
import { getUserItems } from '../../actions';

const Profile = props => {
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const items = useSelector(store => store.items);
  const itemId = useSelector(store => store.item);
  const [userItems, setUserItems] = useState('');
  const [currentItem, setCurrentItem] = useState('');
  const [change, setChange] = useState('');
  const [user, setUser] = useState({
    name: props.user.user.name,
    email: props.user.user.email,
    picture: props.user.user.picture,
    city: props.user.user.city,
    state: props.user.user.state,
    id: props.user.user.id,
  });

  const handleName = e => {
    setName(e);
  };

  useEffect(() => {
    // axios
    //   .get(
    //     'https://randomuser.me/api/?nat=us&?results=1&inc=name,picture,email,registered,location'
    // //   )
    //   .then(res => {
    //     console.log(res);
    //     setUser(res.data.results[0]);
    //   });
    //  userItems === userItems ? [] : [userItems]);
    // dispatch(getItem)
    dispatch(getUserItems(user.id));
    console.log(items);
    setUserItems(items.items.usersItems);
    // setName(user.user.name);
    console.log(userItems);
  }, [dispatch, items, user.id, userItems]);

  return (
    // console.log(credentials.user)

    <div className="profile-content mainContent">
      {console.log(userItems && userItems)}
      <div className="user-info">
        <img src={user.picture} alt="" />
        {user.name && (
          <p style={{ fontWeight: 'bold' }}>
            {`${user.name.charAt(0).toUpperCase() + user.name.slice(1)} `}
          </p>
        )}
        {user.city && user.state && (
          <p>
            Owner of Tech: Located in{' '}
            {`${user.city.charAt(0).toUpperCase() + user.city.slice(1)}, 
                ${user.state.charAt(0).toUpperCase()}${user.state.slice(1)} `}
          </p>
        )}
        <p>Freelance Photographer</p>
        <br />
        <p
          className="addProduct"
          onClick={() => props.history.push('/create-listing')}
        >
          {' '}
          + Add Product
        </p>

        <Rating />
      </div>
      {console.log(currentItem.name)}
      <EditItem
        show={modalShow}
        onHide={() => setModalShow(false)}
        currentItem={currentItem}
      />
      <div className="products">
        {userItems &&
          userItems.map((item, id) => (
            <div
              onClick={e => {
                setModalShow(true);
                axios
                  .get(
                    `https://labstech2rentstaging.herokuapp.com/api/items/${item.id}`
                  )
                  .then(res => {
                    // console.log(currentItem)
                    setCurrentItem(res.data);
                    console.log(currentItem);
                  });
              }}
            >
              <h1>{item.name}</h1>
              <img src={item.picture && item.picture} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
