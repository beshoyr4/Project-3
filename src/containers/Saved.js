class UserListBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        loading: false,
        users: [],
      };
    }
  
    componentDidMount() {
      this.setState({ loading: true });
  
      this.props.firebase.users().on('value', snapshot => {
        const usersObject = snapshot.val();
  
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));
  
        this.setState({
          users: usersList,
          loading: false,
        });
      });
    }
  

render() {

    // const { users, loading } = this.state;

    // return (
    //   <div>
    //     <h1 className="text-center">Saved Connections</h1>
    //     <h3 className="text-center">View and connect with your saved connections!</h3>
    //     <h1 className="text-center">
    //       Connections {this.state.saved} so far!
    //     </h1>
    {
    this.state.users.map(function(user) {
        return <Card name={user.name} 
        instrument={user.instrument} 
        email={user.email} 
        looking={user.looking} 
        instrument={user.instrument} 
        proficiency={proficiency} 
        influences={influences} />
    })
    }

    //           {loading && <div>Loading ...</div>}
    //           <ul>
    //             {users.map(user => (
    //               <li key={user.uid}>
    //                 <span>
    //                   <strong>ID:</strong> {user.uid}
    //                 </span>
    //                 <span>
    //                   <strong>E-Mail:</strong> {user.email}
    //                 </span>
    //                 <span>
    //                   <strong>Username:</strong> {user.username}
    //                 </span>
    //                 <span>
    //                   <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
    //                     Contact
    //                   </Link>
    //                 </span>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
      
    // );
  }
}
