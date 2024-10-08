import axios from "axios";


export const api = axios.create({
	baseURL: "http://localhost:9192",
  });
  
export const getHeader = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};


/* This function adds a new room to the database */
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  try {
    const response = await api.post("/rooms/add/new-room", formData, {
      headers: getHeader(),
    });
    return response.status === 201;
  } catch (error) {
    throw new Error(`Error adding room: ${error.message}`);
  }
}

/* This function gets all room types from the database */
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching room types: ${error.message}`);
  }
}

/* This function gets all rooms from the database */
export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/all-rooms");
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching rooms: ${error.message}`);
  }
}

/* This function deletes a room by the Id */
export async function deleteRoom(roomId) {
  try {
    const result = await api.delete(`/rooms/delete/room/${roomId}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting room: ${error.message}`);
  }
}

//* This function updates a room */
export async function updateRoom(roomId, roomData) {
	const formData = new FormData();
	formData.append("roomType", roomData.roomType);
	formData.append("roomPrice", roomData.roomPrice);
	formData.append("photo", roomData.photo);
  
	try {
	const response = await api.put(`/rooms/update/${roomId}`, formData, {
		headers: getHeader(), // This is where you get the token and attach headers
	});
	return response.data;
	} catch (error) {
	throw new Error(`Error updating room: ${error.message}`);
	}
  }
export async function getRoomById(roomId) {
  try {
    const result = await api.get(`/rooms/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching room: ${error.message}`);
  }
}

/* This function saves a new booking to the database */
export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(`/bookings/room/${roomId}/booking`, booking, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error booking room: ${error.response ? error.response.data : error.message}`);
  }
}

/* This function gets all bookings from the database */
export async function getAllBookings() {
  try {
    const result = await api.get("/bookings/all-bookings", {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
}

/* This function gets booking by the confirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error finding booking: ${error.response ? error.response.data : error.message}`);
  }
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
  try {
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error cancelling booking: ${error.message}`);
  }
}

/* This function gets all available rooms from the database with a given date and room type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  try {
    const result = await api.get(`/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching available rooms: ${error.message}`);
  }
}

/* This function registers a new user */
export async function registerUser(registration) {
  try {
    const response = await api.post("/auth/register-user", registration);
    return response.data;
  } catch (error) {
    throw new Error(`User registration error: ${error.response ? error.response.data : error.message}`);
  }
}

/* This function logs in a registered user */
export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Login error: ${error.response ? error.response.data : error.message}`);
  }
}

/* This function gets the user profile */
export async function getUserProfile(userId) {
  try {
    const response = await api.get(`/users/profile/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching user profile: ${error.message}`);
  }
}

/* This is the function to delete a user */
export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
}

/* This is the function to get a single user */
export async function getUser(userId) {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

/* This is the function to get user bookings by user id */
export async function getBookingsByUserId(userId) {
  try {
    const response = await api.get(`/bookings/user/${userId}/bookings`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching user bookings: ${error.message}`);
  }


}

export const getAllRoles = async () => {
	try {
	const response = await api.get("/roles/all-roles", {
		headers: getHeader(),
	});
	return response.data;
	} catch (error) {
	throw new Error(`Error fetching roles: ${error.message}`);
	}
  };
