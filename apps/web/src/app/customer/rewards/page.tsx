"use client";

import * as React from 'react';
import { UserContext } from '@/context/UserContext';
import { withAuthUser } from '@/hoc/authGuard';
import axios from '@/helper/axiosInstance';
import { DiscountType, PointType } from '@/context/Types';

const PointsPage: React.FunctionComponent = () => {
  const { user } = React.useContext(UserContext);
  const [points, setPoints] = React.useState<PointType[]>([]);
  const [discounts, setDiscounts] = React.useState<DiscountType[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchPoints = async () => {
    try {
      if (user?.email) {
        const { data } = await axios.get(`/api/points/getpoints/${user.email}`);
        setPoints(data.points || []);
        console.log("POINTS FROM SET POINTS::", data.points);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchDiscounts = async () => {
    try {
      if (user?.email) {
        const { data } = await axios.get(`/api/discount/getDiscount/${user.email}`);
        setDiscounts(data.discounts || []);
        console.log("DISCOUNT FROM SET DISCOUNT::", data.discounts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpiredPoints = async () => {
    try {
      await axios.patch('/api/points/deletepoints');
      console.log("POINTS UPDATED:")
    } catch (error) {
      console.log('Failed to mark expired points as deleted:', error);
    }
  };
  
  const deleteExpiredDiscounts = async () => {
    try {
      await axios.patch('/api/discount/deleteDiscount');
      console.log("DISCOUNT UPDATED:")
    } catch (error) {
      console.log('Failed to mark expired discount as deleted:', error);
    }
  };

  React.useEffect(() => {
    const updatedPoints = async () => {
        await deleteExpiredPoints();
        fetchPoints();
      };
      
    const updatedDiscount = async () => {
        await deleteExpiredDiscounts();
        fetchDiscounts();
      };
  
      if (user?.email) {
        updatedPoints();
        updatedDiscount();        
      }
  }, [user?.email]);

  if (loading) {
    return <p className='text-center text-5xl my-8'>LOADING POINTS...</p>;
  }

  return (
    <div>
      <div className="p-8">
        <h1 className="font-bold text-3xl text-orange-500 pb-5">
          My Points
        </h1>
        <hr className='border border-b-2 mb-5'/>
        {points.length > 0 ? (
          <ul className="list-none">
            {points.map((point) => (
              <li key={point.id} className="px-6 py-5 my-5 rounded-md border border-slate-300">
                <div className='font-bold text-2xl text-green-500 pb-2'>+ {point.amount.toLocaleString()}</div>
                <div className="text-gray-500">
                  <span className="font-semibold">Available until:</span> {new Date(point.dateExpire).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-6 py-5 rounded-md border border-slate-300">No points available</p>
        )}
      </div>
      <div className="px-8">
        <h1 className="font-bold text-3xl text-orange-500 pb-5">
          My Discounts
        </h1>
        <hr className='border border-b-2 mb-5'/>
        {discounts.length > 0 ? (
          <ul className="list-none">
            {discounts.map((discount) => (
              <li key={discount.id} className="px-6 py-5 my-5 rounded-md border border-slate-300 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-center mb-3">
                <div className='font-bold text-2xl'>{discount.title}</div>
                <div className="bg-green-500 text-white rounded-full px-3 py-1 text-lg font-semibold">
                  {discount.percent}% OFF
                </div>
              </div>
              <div className="text-gray-700 mb-3">{discount.description}</div>
              <div className="text-gray-500 mb-2">
                <span className="font-semibold">Available until:</span> {new Date(discount.dateExpire).toLocaleDateString()}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-600">
                  <span className="font-semibold">Discount Code:</span> <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">{discount.code}</span>
                </div>
              </div>
            </li>
            ))}
          </ul>
        ) : (
          <p className="px-6 py-5 rounded-md border border-slate-300">No discounts available</p>
        )}
      </div>
    </div>
  );
};

export default withAuthUser(PointsPage);
