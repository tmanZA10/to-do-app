package tmanZA10.todo.to_do_app.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tmanZA10.todo.to_do_app.security.auth.JWTProvider;
import tmanZA10.todo.to_do_app.security.filters.AuthFilter;
import tmanZA10.todo.to_do_app.security.filters.RefreshTokenFilter;

@Configuration
public class FilterConfig {

    private final JWTProvider jwtProvider;

    public FilterConfig(JWTProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Bean
    public FilterRegistrationBean<AuthFilter> authFilter() {

        FilterRegistrationBean<AuthFilter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new AuthFilter(jwtProvider));
        filterRegistrationBean.addUrlPatterns("/api/*");
        return filterRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean<RefreshTokenFilter> tokenFilter() {
        FilterRegistrationBean<RefreshTokenFilter> filter = new FilterRegistrationBean<>();
        filter.setFilter(new RefreshTokenFilter());
        filter.addUrlPatterns("/auth/refresh");
        return filter;
    }
}
