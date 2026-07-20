from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import User
from app.core.settings import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials"
    )

    try:
        print("\n==============================")
        print(" TOKEN RECEIVED:")
        print(token)

        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        print("\n PAYLOAD:")
        print(payload)

        email = payload.get("sub")

        print("\n EMAIL FROM TOKEN:")
        print(email)

        if email is None:
            print(" No 'sub' found in token.")
            raise credentials_exception

    except JWTError as e:
        print("\n JWT ERROR:")
        print(str(e))
        raise credentials_exception

    print("\n Searching database...")

    user = db.query(User).filter(
        User.email == email
    ).first()

    print("\n USER FOUND:")
    print(user)

    if user is None:
        print("User not found in database.")
        raise credentials_exception

    print("✅ Authentication Successful")
    print("==============================\n")

    return user