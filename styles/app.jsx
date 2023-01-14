import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    loadText: {
        position: "absolute",
        // top: "50rem",
        // left: "50rem",
    },

    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    map: {
      width: 200,
      display: "flex",
      justifyContent:"center",
      alignItems:"center",
      height: "100%"
      // ...StyleSheet.absoluteFillObject,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
    },
    buttonCenter: {
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 12,
      justifyContent:'center',
      borderRadius: 8,
      width:100,
      height:'100%',
      // elevation: 3,
      backgroundColor: 'white',
    },
    marker: {
      height:'4%',
      justifyContent:'center',
      alignItems:'center',
      width: '100%',
    },
    textMarker: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'white',
      position:'relative',
      justifyContent:'center',
      alignItems:'center',
    },
    touchMarker:{
      backgroundColor:'black',
      width:"17%",
      justifyContent:'center',
      alignItems:'center',
      height:"100%",
      bottom:'100%',
      position:'absolute',
      borderRadius:'10px',
    },
    panel: {
      flex: 1,
      backgroundColor: "white",
      position: "relative"
    },
    panelHeader: {
      height: 180,
      backgroundColor: "#b197fc",
      justifyContent: "flex-end",
      padding: 24
    },
    textHeader: {
      fontSize: 28,
      color: "#FFF"
    },
    icon: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: -24,
      right: 18,
      width: 48,
      height: 48,
      zIndex: 1
    },
    iconBg: {
      backgroundColor: "#2b8a3e",
      position: "absolute",
      top: -24,
      right: 18,
      width: 48,
      height: 48,
      borderRadius: 24,
      zIndex: 1
    },
    button1: {
      height: 50,
      borderRadius: 25,
      aspectRatio: 1,
      backgroundColor: 'white',
      opacity: 0.6,
    },
    dolbaeb: {
      bottom: '5%',
      position: 'absolute',
      display: 'flex',
      width:'100%',
      justifyContent:'space-around',
      flexDirection:'row',
    },
    regionView:{
      top: '7%',
      left: '5%',
      position: 'absolute',
      display: 'flex',
      width:'100%',
      flexDirection:'row',

    },
    regionBc:{
      display:'flex',
      backgroundColor:'white',
      borderRadius:10,
      padding:7,
    },
    regionTxt:{
      fontSize:32,
      // textDecorationLine:'underline',
      fontWeight: 'bold',
    },
    allChat:{
      display:'flex',
      width:'100%',
      backgroundColor:'#bdbdbd',
      height:'100%',
    },
    userChat:{
      display:'flex',
      width:'100%',
      height:'8%',
      backgroundColor:'black',
      marginBottom:15,
      flexDirection:'row',
      alignItems:'center',
    },
    userImg:{
      display:'flex',
      width:50,
      marginLeft:5,
      borderRadius:8,
      height:50,
      backgroundColor:'white',
    },
    userNick:{
      display:'flex',
      alignItem:'center',
      width:'15%',
      justifyContent:'center',
      marginLeft:10,
    },
    userNickTxt:{
      display:'flex',
      color:'white',
      fontSize:16,
    },
    userMsgTxt:{
      display:'flex',
      color:'black',
      backgroundColor:'#bdbdbd',
      borderRadius:10,
      height:'30%',
      fontSize:15,
      width:'100%',
      // width:100,
    },
    userMsg:{
      width:'100%',
      display:'flex',
      alignItem:'center',
      marginRight:50,
      backgroundColor:'black',
      height:'100%',
      justifyContent:'center',
    },
    markerFixed: {
      left: '50%',
      marginLeft: -24,
      marginTop: -48,
      position: 'absolute',
      top: '50%'
    },
    markerInvisible: {
      height: 48,
      width: 48
    },

  });