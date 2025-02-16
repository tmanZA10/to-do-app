package tmanZA10.todo.to_do_app.security.filters;

import jakarta.servlet.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import tmanZA10.todo.to_do_app.controller.AuthController;

import java.io.IOException;

public class RefreshTokenFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        Cookie[] cookies = request.getCookies();
        Cookie refreshCookie = null, userIdCookie = null, emailCookie = null;

        String message = "Auth Cookie(s) missing.";
        int code = HttpStatus.FORBIDDEN.value();

        if (cookies == null) {
            response.sendError(code, message );
            return;
        }
        if (!(cookies.length > 0)) {
            response.sendError(code, message );
            return;
        }
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(AuthController.refreshCookieName)){
                refreshCookie = cookie;
            }
            if (cookie.getName().equals(AuthController.userIdCookieName)){
                userIdCookie = cookie;
            }
            if (cookie.getName().equals(AuthController.emailCookieName)){
                emailCookie = cookie;
            }

        }
        if (refreshCookie == null || userIdCookie == null || emailCookie == null) {
            response.sendError(code, message);
            return;
        }
        filterChain.doFilter(request, response);
    }
}
