import React, { useEffect, useRef, useState } from 'react';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, TextField, IconButton, Typography } from '@mui/material';

import Peer from 'simple-peer';
import io from 'socket.io-client';
import './DoctorVideoCall.css';

const socket = io.connect('https://doctorappointment123.herokuapp.com');
const DoctorVideoCall = () => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [idToCall, setIdToCall] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  console.log(me);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: 'black' }}>XYB</h1>
      <div className="container">
        <div className="video-container">
          <div className="video">
            <Typography variant="h5" gutterBottom>
              {name || 'Name'}
            </Typography>

            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: '200px' }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <>
                <Typography variant="h5" gutterBottom>
                  {call.name || 'Name'}
                </Typography>
                <video
                  playsInline
                  ref={userVideo}
                  autoPlay
                  style={{ width: '400px' }}
                />
              </>
            ) : null}
          </div>
        </div>
        <div className="myId">
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <CopyToClipboard text={me} style={{ marginBottom: '2rem' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ContentCopyIcon fontSize="large" />}
            >
              Copy Your ID
            </Button>
          </CopyToClipboard>

          <TextField
            id="filled-basic"
            label="ID to call"
            variant="filled"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary" onClick={leaveCall}>
                End Call
              </Button>
            ) : (
              <IconButton
                color="primary"
                aria-label="call"
                onClick={() => callUser(idToCall)}
              >
                <PhoneInTalkIcon fontSize="large" />
              </IconButton>
            )}
            {/* {idToCall} */}
          </div>
        </div>
        <div>
          {call.isReceivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{call.name} is calling...</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DoctorVideoCall;
