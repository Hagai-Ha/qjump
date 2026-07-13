import stores from '../stores/AppointmentStore';
import { useState } from 'react';
import { data } from '../data/supabaseClient';

const unasignedAppointments = async () => {
    try {
        const { data: appointments, error } = await data
            .from('appointments')
            .select('*')
            .is('patient_id', null);
        return appointments;
    } catch (error) {
        console.error('Error fetching unassigned appointments:', error);
        throw error;
    }
};

const precedeRequests = async () => {
    try {
        const { data: precede_requests, error } = await data
            .from('precede_requests')
            .select('*');
        return precede_requests;
    } catch (error) {
        console.error('Error fetching precede requests:', error);
        throw error;
    }
};
const postponeRequests = async () => {
    try {
        const { data: postpone_requests, error } = await data
            .from('postpone_requests')
            .select('*');
        return postpone_requests;
    } catch (error) {
        console.error('Error fetching postpone requests:', error);
        throw error;
    }
};