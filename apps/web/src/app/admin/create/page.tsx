'use client';
import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/router';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import e from 'cors';
import { Console } from 'console';
interface ICreateEventPageProps {}
const CreateEventPage: React.FunctionComponent<ICreateEventPageProps> = (
  props,
) => {
  const router = useRouter;
  const [titleEvent, setTitleEvent] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState<Number>(0);
  const [type, setType] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [categorievent, setCategorievent] = React.useState<Number>(0);
  const [tanggalEvent, setTanggalEvent] = React.useState('');
  const handleSubmit = async () => {
    console.log('this is title event', titleEvent);
    const newData = {
      namaEvent: titleEvent,
      deskripsiEvent: description,
      locationId: location,
      type,
      status,
      tanggalEvent: tanggalEvent,
      categoriId: categorievent,
    };
    try {
      console.log('data event', newData);
      await axios.post('http://localhost:8001/api/event/create', newData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
      });
      alert('berhasil buat event');
    } catch (error) {
      console.log('create data error', error);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl">Create Event</h1>
      <div className="w-full  flex flex-col p-10 gap-10">
        <div className="w-1/2">
          <div>
            <p>Title Event</p>
            <input
              type="text"
              placeholder="title event"
              value={titleEvent}
              onChange={(e) => setTitleEvent(e.target.value)}
              className="border-solid border-b-black border w-full h-12"
            />
          </div>
          <div>
            <p>Descriptio</p>
            <Textarea
              placeholder="Drop your description here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <p>Location</p>
            <input
              type="number"
              placeholder="Location"
              value={String(location)}
              onChange={(e) => setLocation(parseInt(e.target.value))}
              className="border-solid border-b-black border w-full h-12"
            />
          </div>
          <div>
            <p>Type Event</p>
            <input
              type="text"
              placeholder="type event"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border-solid border-b-black border w-full h-12"
            />
          </div>
          <div>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="status">Status</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div>
            <p>Categori</p>
            <input
              type="number"
              placeholder="categori"
              className="border-solid border-b-black border w-full h-12"
              value={String(categorievent)}
              onChange={(e) => setCategorievent(parseInt(e.target.value))}
            />
          </div>
          <div>
            <p>Tanggal </p>
            <input
              type="date"
              value={tanggalEvent}
              onChange={(e) => setTanggalEvent(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button className="bg-slate-400 shadow-md" onClick={handleSubmit}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
