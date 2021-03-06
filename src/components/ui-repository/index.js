import React,{ useContext, useEffect, useState } from 'react';
import { Row,Col,Card,Avatar,Button } from 'antd';
import { useLocation } from 'react-router-dom';
import { ContextApp } from '@context';
import {
    HeartOutlined,
    HeartFilled
} from '@ant-design/icons';
import './style.scss';

const UIRepository = ({url_image,name,owner_name,html_url}) => {
    const location = useLocation();
    const contextApp = useContext(ContextApp);
    const { dataApp,setDataApp,addRepoFav } = contextApp;

    const [ data , setData ] = useState({
        repo:{
            id:'',
            url_image:url_image,
            name:name,
            owner_name:owner_name,
            html_url:html_url,
        },
        isFav:false,
    });

    const setInitFav = () => {
        const dataArray = dataApp.repoFav;
        if(dataArray.filter((item)=> item.name == data.repo.name)[0]){
            setData({...data,isFav:true})
        } 
    }


    useEffect( () => {
        setInitFav();
    },[]);

    useEffect( () => {
        setInitFav();
    },[dataApp.repoFav]);

    const handleFav = () => {
        const favTemp = !data.isFav;
        setData({...data,isFav:favTemp});
        addRepoFav(favTemp,data);
    }

    return(
        <Card className={'container-repo'}>
            <Avatar src={url_image}/>
            <h2>Repo name: <a href={html_url}><strong>{name}</strong></a></h2>
            <p>owner: <strong>{owner_name}</strong></p>
            <Button type={'default'} onClick={handleFav} icon={!data.isFav ? <HeartOutlined /> : <HeartFilled />}/>
        </Card>
    );
}

export default UIRepository;