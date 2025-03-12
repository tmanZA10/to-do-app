package tmanZA10.todo.to_do_app.security.filters;

import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import tmanZA10.todo.to_do_app.security.auth.JWTProvider;

import java.io.IOException;

public class AuthFilter implements Filter {

    private final JWTProvider jwtProvider;

    public AuthFilter(JWTProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || authHeader.isEmpty()) {
            response.sendError(HttpStatus.UNAUTHORIZED.value());
            return;
        }

        if (!authHeader.startsWith("Bearer ")) {
            response.sendError(HttpStatus.UNAUTHORIZED.value());
            return;
        }

        String[] authTokenSplit = authHeader.split(" ");
        if (authTokenSplit.length != 2) {
            response.sendError(HttpStatus.UNAUTHORIZED.value());
        }

        String token = authTokenSplit[1];
        try{
            jwtProvider.verifyToken(token);
        }catch (SignatureVerificationException | TokenExpiredException e){
            response.sendError(HttpStatus.UNAUTHORIZED.value());
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }
}
