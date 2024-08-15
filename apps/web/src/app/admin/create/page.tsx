 "use client"
import { useState } from 'react';
import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
interface ICreateEventPageProps {
}

const CreateEventPage: React.FunctionComponent<ICreateEventPageProps> = (props) => {
 const [titleevent,setTitleEvent]= React.useState("");
 const [description,setDescription]=React.useState("");
 const [location,setLocation]=React.useState("");
 const [type,setType]=React.useState("");
 const [status,setStatus]=React.useState("");
 const [stardate,setStardate]=React.useState("");
 const [enddate,setEnddate]=React.useState("");
 
 
 return <div>
    <div>
        <input type="text" placeholder='title event' />
    </div>
    <div>
        <input type="text" placeholder='description' />
    </div>
    <div>
        <input type="text" placeholder='Location' />
    </div>
    <div>
        <input type="text" placeholder='type event' />
    </div>
    <div>
        <select>
        <option value="status">STATUS</option>
        <option value="FREE">FREE</option>
        <option value="PAID">PAID</option>
        </select>
    </div>
    <div>
        <input type="text"placeholder='categori' />
    </div>
    <div>
        <p>
            start date
        </p>
        <input type="date"/>
    </div>
    <div>
        <p>
            end date
        </p>
        <input type="date"/>
    </div>

  </div> ;
};

export default CreateEventPage;

