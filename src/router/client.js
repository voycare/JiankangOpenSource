import EmptyLayout from "../layouts/EmptyLayout";
import VoiceCall from "../views/clients/VoiceCall";
import AppoinmentListing from "../views/clients/AppoinmentListing";
import AppointmentDetail from '../views/clients/AppointmentDetail'
import AppointmentCancellation from '../views/clients/AppointmentCancellation'
import PaymentListing from '../views/clients/PaymentListing.vue'
import Chat from "../views/clients/Chat";
import ReviewListing from "../views/clients/ReviewListing";
import ReviewDetailOrAdd from '../views/clients/ReviewDetailOrAdd'
import MyProfile from "../views/clients/MyProfile";
import MessageListing from '../views/clients/MessageListing'
import ClientSettingNotification from "../views/clients/ClientSettingNotification";
import SettingLocalization from '../views/clients/SettingLocalization'
import SettingPassword from '../views/SettingPassword'
import Signed from "../views/clients/Signed";
import ClientDashboard from '../views/clients/Dashboard';
import ClientLogin from "../views/ClientLogin";
import ClientResetPassword from "../views/ClientResetPassword";
import PaymentDetail from "../views/clients/PaymentDetail"
import ProfileEdit from "../views/clients/ProfileEdit"

const routes_client = [
  {
    path: '/login',
    meta: {layout: "login"},
    name: 'UserLogin',
    component: ClientLogin
  },
  {
    path: '/signed',
    name: 'Signed',
    component: Signed
  },
  {
    path: '/forget-password',
    meta: {layout: "login"},
    name: 'ClientResetPassword',
    component: ClientResetPassword
  },
  {
    path: '/',
    name: 'ClientDashboard',
    meta: {layout: "client"},
    component: ClientDashboard
  },
  {
    path: '/appointments',
    name: 'Appointment',
    meta: {layout: "client"},
    component: AppoinmentListing
  },
  {
    path: '/appointment/:id',
    name: 'AppointmentDetail',
    meta: {layout: "client"},
    component: AppointmentDetail
  },
  {
    path: '/appointment/:id/cancel',
    name: 'AppointmentCancellation',
    meta: {layout: "client"},
    component: AppointmentCancellation
  },
  {
    path: '/chat',
    name: 'Chat',
    meta: {layout: "client"},
    component: Chat
  },
  {
    path: '/voice-call',
    name: 'Voice Call',
    meta: {layout: "client"},
    component: VoiceCall
  },
  {
    path: '/payments',
    name: 'PaymentListing',
    meta: {layout: "client"},
    component: PaymentListing
  },
  {
    path: '/payment/:id',
    name: 'PaymentDetail',
    meta: {layout: 'client'},
    component: PaymentDetail
  },
  {
    path: '/messages',
    name: 'MessageListing',
    meta: {layout: 'client'},
    component: MessageListing
  },
  {
    path: '/reviews',
    name: 'ReviewListing',
    meta: {layout: "client"},
    component: ReviewListing
  },
  {
    path: '/reviews/:id',
    name: 'ReviewDetailOrAdd',
    meta: {layout: 'client'},
    component: ReviewDetailOrAdd
  },
  {
    path: '/profile',
    name: 'My Profile',
    meta: {layout: "client"},
    component: MyProfile
  },
  {
    path: '/profile-edit',
    name: 'ProfileEdit',
    meta: {layout: "client"},
    component: ProfileEdit
  },
  {
    path: '/settings/notification',
    name: 'ClientSettingNotification',
    meta: {layout: "client"},
    component: ClientSettingNotification
  },
  {
    path: '/setting-localization',
    name: 'SettingLocalization',
    meta: {layout: 'client'},
    component: SettingLocalization
  },
  {
    path: '/settings/password',
    name: 'SettingPassword',
    meta: {layout: 'client'},
    component: SettingPassword
  },
  {
    path: '*',
    name: 'Empty',
    meta: {layout: "empty"},
    component: EmptyLayout
  },
]

export default routes_client
