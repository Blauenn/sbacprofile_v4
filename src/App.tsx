import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { fetch_user_info } from "./functions/fetch/fetch_user.function";
import { student_access_only } from "./functions/permission_check.function";
// Contexts providers //
import { AnnouncementsContextProvider } from "./contexts/Announcement.context";
import { ClassroomContextProvider } from "./contexts/Classroom.context";
import { StudentsContextProvider } from "./contexts/Student.context";
import { TeachersContextProvider } from "./contexts/Teacher.context";
import { ClubsContextProvider } from "./contexts/Clubs.context";
import { LeaveNoticesContextProvider } from "./contexts/forms/LeaveNotice.context";
import { RequestFormsContextProvider } from "./contexts/forms/RequestForm.context";
// Contexts //
import { useContext_Account } from "./contexts/Account.context";
// Components //
import Sidebar from "./components/miscellaneous/Sidebar/Sidebar.component";
import PageNotFound from "./components/miscellaneous/PageNotFound.component";
import Loading from "./components/miscellaneous/Loading.component";

// Pages //
const Admin_Announcements = lazy(() => import("./pages/Admin/Admin_Announcements.page"));
const Admin_Classrooms = lazy(() => import("./pages/Admin/Admin_Classrooms.page"));
const Admin_Students = lazy(() => import("./pages/Admin/Admin_Students.page"));
const Admin_Teachers = lazy(() => import("./pages/Admin/Admin_Teachers.page"));
const Admin_Clubs = lazy(() => import("./pages/Admin/Admin_Clubs.page"));
const Admin_LeaveNotices = lazy(() => import("./pages/Admin/Forms/Admin_LeaveNotices.page"));
const Admin_RequestForms = lazy(() => import("./pages/Admin/Forms/Admin_RequestForms.page"));

const Head_Students = lazy(() => import("./pages/Head/Head_Students.page"));
const Head_Teachers = lazy(() => import("./pages/Head/Head_Teachers.page"));
const Head_Clubs = lazy(() => import("./pages/Head/Head_Clubs.page"));
const Head_LeaveNotices = lazy(() => import("./pages/Head/Forms/Head_LeaveNotices.page"));
const Head_RequestForms = lazy(() => import("./pages/Head/Forms/Head_RequestForms.page"));

const Login = lazy(() => import("./pages/Login.page"));
const Home = lazy(() => import("./pages/Home.page"));
const Announcements = lazy(() => import("./pages/Announcements.page"));

const Dashboard = lazy(() => import("./pages/Dashboard.page"));
const Student_LeaveNotices = lazy(() => import("./pages/Forms/Student_LeaveNotices.page"));
const Teacher_LeaveNotices = lazy(() => import("./pages/Forms/Teacher_LeaveNotices.page"));
const Student_RequestForms = lazy(() => import("./pages/Forms/Student_RequestForms.component"));
const Teacher_RequestForms = lazy(() => import("./pages/Forms/Teacher_RequestForms.page"));

const Students = lazy(() => import("./pages/Students.page"));
const Teachers = lazy(() => import("./pages/Teachers.page"));

const Clubs = lazy(() => import("./pages/Clubs.page"));
const Student_Club = lazy(() => import("./pages/Club/Student_Club.page"));
const Teacher_Club = lazy(() => import("./pages/Club/Teacher_Club.page"));

const Settings = lazy(() => import("./pages/Settings.page"));

const App = () => {
	const location = useLocation();

	const {
		accessToken,
		isLoggedIn,
		setAccessToken,
		userInfo,
		setUserInfo,
		setIsLoggedIn,
	} = useContext_Account();

	useEffect(() => {
		const storedAccessToken = localStorage.getItem("accessToken");

		if (storedAccessToken) {
			setAccessToken(storedAccessToken);
			setIsLoggedIn(true);

			if (accessToken) {
				fetch_user_info(accessToken, setUserInfo);
			} else {
				setIsLoggedIn(false);
			}
		}
	}, [accessToken]);

	return isLoggedIn ? (
		<div className="flex flex-row">
			<Sidebar />

			<div className="relative w-full my-16 me-8 ms-20 sm:my-20 sm:me-20 sm:ms-32 lg:me-28 lg:ms-40">
				<AnimatePresence>
					<Suspense fallback={<Loading />}>
						<Routes location={location} key={location.pathname}>
							{/* No URL */}
							<Route path="" element={<Navigate to="/home" replace />} />
							<Route path="/login" element={<Navigate to="/home" replace />} />
							{/* Page not found */}
							<Route path="*" element={<PageNotFound />}></Route>

							{/* Admin only */}
							{/* Admin announcements */}
							<Route
								path="/admin/announcements"
								element={
									<AnnouncementsContextProvider>
										<Admin_Announcements />
									</AnnouncementsContextProvider>
								}
							></Route>
							{/* Admin classrooms */}
							<Route
								path="/admin/classrooms"
								element={
									<ClassroomContextProvider>
										<TeachersContextProvider>
											<Admin_Classrooms />
										</TeachersContextProvider>
									</ClassroomContextProvider>
								}
							></Route>
							{/* Admin students */}
							<Route
								path="/admin/students"
								element={
									<StudentsContextProvider>
										<Admin_Students />
									</StudentsContextProvider>
								}
							></Route>
							{/* Admin teachers */}
							<Route
								path="/admin/teachers"
								element={
									<TeachersContextProvider>
										<Admin_Teachers />
									</TeachersContextProvider>
								}
							></Route>
							{/* Admin clubs */}
							<Route
								path="/admin/clubs"
								element={
									<ClubsContextProvider>
										<TeachersContextProvider>
											<Admin_Clubs />
										</TeachersContextProvider>
									</ClubsContextProvider>
								}
							></Route>
							{/* Admin leave notices */}
							<Route
								path="/admin/leaveNotices"
								element={
									<LeaveNoticesContextProvider>
										<Admin_LeaveNotices />
									</LeaveNoticesContextProvider>
								}
							></Route>
							{/* Admin request forms */}
							<Route
								path="/admin/requestForms"
								element={
									<RequestFormsContextProvider>
										<StudentsContextProvider>
											<Admin_RequestForms />
										</StudentsContextProvider>
									</RequestFormsContextProvider>
								}
							></Route>

							{/* Head only */}
							{/* Head students */}
							<Route
								path="/majors/students"
								element={
									<StudentsContextProvider>
										<Head_Students />
									</StudentsContextProvider>
								}
							></Route>
							{/* Head teachers */}
							<Route
								path="/majors/teachers"
								element={
									<TeachersContextProvider>
										<Head_Teachers />
									</TeachersContextProvider>
								}
							></Route>
							{/* Head clubs */}
							<Route
								path="/majors/clubs"
								element={
									<ClubsContextProvider>
										<TeachersContextProvider>
											<Head_Clubs />
										</TeachersContextProvider>
									</ClubsContextProvider>
								}
							></Route>
							{/* Head leave notices */}
							<Route
								path="/majors/leaveNotices"
								element={
									<LeaveNoticesContextProvider>
										<StudentsContextProvider>
											<Head_LeaveNotices />
										</StudentsContextProvider>
									</LeaveNoticesContextProvider>
								}
							></Route>
							{/* Head request forms */}
							<Route
								path="/majors/requestForms"
								element={
									<RequestFormsContextProvider>
										<StudentsContextProvider>
											<Head_RequestForms />
										</StudentsContextProvider>
									</RequestFormsContextProvider>
								}
							></Route>

							{/* General access */}
							{/* Home */}
							<Route
								path="/home"
								element={
									<AnnouncementsContextProvider>
										<Home />
									</AnnouncementsContextProvider>
								}
							></Route>
							{/* Announcements */}
							<Route
								path="/announcements"
								element={
									<AnnouncementsContextProvider>
										<Announcements />
									</AnnouncementsContextProvider>
								}
							></Route>

							{/* Dashboard */}
							<Route
								path="/dashboard"
								element={
									<Dashboard />
								}
							></Route>
							{/* Leave notices */}
							<Route
								path="/leaveNotices"
								element={
									<LeaveNoticesContextProvider>
										<StudentsContextProvider>
											{
												student_access_only(userInfo.profile_position) ? (
													<Student_LeaveNotices />
												) : (
													<ClassroomContextProvider>
														<Teacher_LeaveNotices />
													</ClassroomContextProvider>
												)
											}
										</StudentsContextProvider>
									</LeaveNoticesContextProvider>
								}
							></Route>
							{/* Request forms */}
							<Route
								path="/requestForms"
								element={
									<RequestFormsContextProvider>
										<StudentsContextProvider>
											{
												student_access_only(userInfo.profile_position) ? (
													<Student_RequestForms />
												) : (
													<ClassroomContextProvider>
														<Teacher_RequestForms />
													</ClassroomContextProvider>
												)
											}
										</StudentsContextProvider>
									</RequestFormsContextProvider>
								}
							></Route>

							{/* Students */}
							<Route
								path="/students"
								element={
									<StudentsContextProvider>
										<Students />
									</StudentsContextProvider>
								}
							></Route>
							{/* Teachers */}
							<Route
								path="/teachers"
								element={
									<TeachersContextProvider>
										<Teachers />
									</TeachersContextProvider>
								}
							></Route>

							{/* Clubs */}
							<Route
								path="/clubs"
								element={
									<ClubsContextProvider>
										<StudentsContextProvider>
											<TeachersContextProvider>
												<Clubs />
											</TeachersContextProvider>
										</StudentsContextProvider>
									</ClubsContextProvider>
								}
							></Route>
							{/* Clubs */}
							<Route
								path="/club"
								element={
									<ClubsContextProvider>
										<StudentsContextProvider>
											<TeachersContextProvider>
												{student_access_only(userInfo.profile_position) ? (
													<Student_Club />
												) : (
													<Teacher_Club />
												)}
											</TeachersContextProvider>
										</StudentsContextProvider>
									</ClubsContextProvider>
								}
							></Route>

							{/* Settings */}
							<Route
								path="/settings"
								element={
									<Settings />
								}
							></Route>
						</Routes>
					</Suspense>
				</AnimatePresence>
			</div>
		</div>
	) : (
		<Suspense>
			<Routes>
				<Route path="*" element={<Navigate to="/login" replace />} />
				<Route
					path="/login"
					element={
						<Login
							setAccessToken={setAccessToken}
							setUserInfo={setUserInfo}
							setIsLoggedIn={setIsLoggedIn}
						/>
					}
				/>
			</Routes>
		</Suspense>
	);
};

export default App;
