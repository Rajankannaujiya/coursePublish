"use client";

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hook';
import Loading from './Loading';
import { ErrorComp } from './ErrorComp';
import { fetchInstructors } from '../store/features/instructor';

const SingleInstructor = ({ instructorId }: { instructorId: string | null }) => {
    const [instructor, setInstructor] = useState('');
    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector(state => state.instructor);

    useEffect(() => {
        dispatch(fetchInstructors());
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            const foundInstructor = data.find(i => i.id === instructorId);
            setInstructor(foundInstructor?.user.name || "Instructor not found");
        }
    }, [data, instructorId]); // Only run when data or instructorId changes

    if (loading) return <Loading />;
    if (error) return <ErrorComp error={error} />;

    return <div className='text-midnight-blue-900 font-bold'>{instructor?instructor: "not assigned"}</div>;
};

export default SingleInstructor;